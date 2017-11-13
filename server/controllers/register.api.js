var express = require("express"),
 router = express.Router(),
 register = require("../models/register.js");
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
 
router.post("/", function(req, res) {
	var obj = req.body;
	console.log(req.body);
	var deferred = Q.defer();
    // validation
    register.findOne(
        { username: obj.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                console.log('Username "' + obj.username + '" is already taken')
                deferred.reject('Username "' + obj.username + '" is already taken');
            } else {
            	console.log('Username "' + obj.username + '" is not taken')
                createUser();
            }
        });
    function createUser() {
    	
    	// set user object to userParam without the cleartext password
        var reg = _.omit(obj, 'password');

        // add hashed password to user object
        reg.password = bcrypt.hashSync(obj.password, 10);
        console.log(reg);

        /*db.users.insert(
	        user,
	        function (err, doc) {
	            if (err) deferred.reject(err.name + ': ' + err.message);

	            deferred.resolve();
	        });*/
	        console.log(obj);
    	var model = new register(reg);
		model.save(function(err,doc) {
			if (err) deferred.reject(err.name + ': ' + err.message);
			deferred.resolve();
			//res.send("user created");
		});
    };
    return deferred.promise;
	/*var model = new user(obj);
	model.save(function(err) {
		if (err) {
			res.send("error");
		return;
		}
	res.send("created");
	});*/
});
 
module.exports = router;