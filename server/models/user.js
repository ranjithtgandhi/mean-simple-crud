var mongoose = require("mongoose"),
 Schema = mongoose.Schema,
 objectId = mongoose.Schema.ObjectId;
 
var userSchema = new Schema({
 _id: { type: objectId, auto: true },
 userName: { type: String, required: true },
 contactNo: { type: String, required: true },
 address: { type: String, required: true },
 file: { type: String, required: false }
}, {
 versionKey: false
});
 
var user = mongoose.model('users', userSchema);
 
module.exports = user;