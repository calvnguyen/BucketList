console.log('Server - Bucket controller loading...');
var mongoose = require('mongoose');
var BucketItem = mongoose.model('BucketItem');
var User = mongoose.model('User');


function BucketController(){

	this.index = function(req, res){

		BucketItem.find({}).populate('_user').exec(function(err, items){
			if (err){
				console.log('error getting bucket items from db')
			}
			else{
				console.log('successfully retrieved bucket items from db')
				console.log(items);
			   
	    		res.json(items);	
			}
		})
	};

	this.create = function(req, res) {
   		console.log("server - inside bucket item create controller")
   		console.log(req.body);
   		
		BucketItem.create(req.body, function(err, item){
	  		if(err){
	        	console.log("error creating a new bucket item");
	  		}
	  		else{
	    		res.json(item);
	  		}
		})

	};

	this.show = function(req, res){

		BucketItem.findById({_id: req.params.id}, function(err, item){
			if (err){
				console.log('error getting a Bucket item from db')
			}
			else{
				console.log('successfully retrieved an Bucket item from db')
			   
	    		res.json(item);	
			}
		})
	};

}


module.exports = new BucketController();