var mongoose = require("mongoose"),
 Schema = mongoose.Schema,
 objectId = mongoose.Schema.ObjectId;
 
var regSchema = new Schema({
 _id: { type: objectId, auto: true },
 firstName: { type: String, required: true },
 lastName: { type: String, required: true },
 username: { type: String, required: true },
 password: { type: String, required: false }
}, {
 versionKey: false
});
 
var register = mongoose.model('register', regSchema);
 
module.exports = register;