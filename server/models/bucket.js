// require mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BucketItemSchema = new mongoose.Schema({
 title: {type: String, required: true, minlength: 1},
 description: {type: String},
 creator: {type: String, required: true},
 // status: 0 is Pending, 1 is Done. Defaults to 0
 status: {type: Number, required: true, minlength: 1, default: 0},  
 _user: [{type: Schema.Types.ObjectId, ref: 'User'}]},
 {timestamps: true });

mongoose.model('BucketItem', BucketItemSchema); 