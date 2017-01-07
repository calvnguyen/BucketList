// require mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BucketItemSchema = new mongoose.Schema({
 title: {type: String, required: true, minlength: 1},
 description: {type: String},
 _created_by: {type: Schema.Types.ObjectId, ref: 'User', required: true},
 // status: False is Pending, True is Completed
 status: {type: Boolean, required: true, minlength: 1, default: false},
 _tagged: {type: Schema.Types.ObjectId, ref: "User"}},
 {timestamps: true });

mongoose.model('BucketItem', BucketItemSchema); 