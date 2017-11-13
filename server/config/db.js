var mongoose = require('mongoose');
	mongoose.Promise = global.Promise;
var connection = mongoose.connect('mongodb://localhost:27017/mean_crud');
 
module.exports = connection;