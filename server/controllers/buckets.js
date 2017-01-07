console.log('Server - Bucket controller loading...');
var mongoose = require('mongoose');
var BucketItem = mongoose.model('BucketItem');
var User = mongoose.model('User');


function BucketController(){

	this.index = function(req, res){

		BucketItem.find({}).populate('_tagged _created_by').exec(function(err, items){
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
	        	console.log(err);
	  		}
	  		else{
	  			User.findById({_id: req.body._tagged}, function(err, user){
	  				if(err){
	  					console.log("error finding user to add item");
	  				}
	  				else
	  				{

		  				user._items.push(item);
		  				user.save(function (err){
		  					if(err){
		  						console.log("error adding an item to a user");
		  					}
		  					else{
		  						console.log("add item to a user successfully");

		  					}
	  					})

	  				
	  				}
	  				
	  			})

	  			if(req.body._created_by != req.body._tagged){
	  				console.log("tagging item to another user");
		  		 	User.findById({_id: req.body._created_by}, function(err, user){
		  				if(err){
		  					console.log("error finding creator user to add item");
		  				}
		  				else
		  				{

			  				user._items.push(item);
			  				user.save(function (err){
			  					if(err){
			  						console.log("error adding an item to a creator user");
			  					}
			  					else{
			  						console.log("add item to a creator user successfully");
			  					}
		  					})

		  				
		  				}
		  				
		  			})

		  	
		  		}
		  		res.json(item);	
	  		}
		})

	};

	this.show_pending = function(req, res){

		BucketItem.find({_tagged: req.params.id, status: false}).populate('_tagged _created_by').exec(function(err, items){
			if (err){
				console.log('error getting pending items for single user from db')
			}
			else{
				console.log('successfully retrieved pending items for single user from db')
			   
	    		res.json(items);	
			}
		})
	};


	this.show_completed = function(req, res){

		BucketItem.find({_tagged: req.params.id, status: true}).populate('_tagged _created_by').exec(function(err, items){
			if (err){
				console.log('error getting completed items for single user from db')
			}
			else{
				console.log('successfully retrieved completed items for single user from db')
			   console.log(items);
	    		res.json(items);	
			}
		})
	};


	this.update = function(req, res){
		console.log("server - controller - update status");
		console.log("status is " + req.body.code);
		BucketItem.findById({_id: req.params.id}, function(err, item){
			if(err){
				console.log("cannot find item id to update status");
			}
			else{
				BucketItem.update({_id: item._id}, {status: req.body.code}, function(err, result){
					if(err){
						console.log("cannot update the status on item");
					}
					else{
						console.log("updated the status on item successfully");
						res.json(item);
					}
				})
			}
		})
	};
}


module.exports = new BucketController();