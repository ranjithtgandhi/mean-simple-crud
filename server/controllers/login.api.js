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

    register.findOne({ "username": obj.username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(obj.password, user.password)) {
            res.send({"error":false,"message":"login successful"});
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, "secret"));
        } else {
            res.send({"error":true,"message":"login failed"});
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
});
 
module.exports = router;