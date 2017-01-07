// require mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 1}, 
 _items: [{type: Schema.Types.ObjectId, ref: 'BucketItem'}]},
 {timestamps: true });

mongoose.model('User', UserSchema); 