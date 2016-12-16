// require mongoose
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 1}},
 {timestamps: true });

mongoose.model('User', UserSchema); 