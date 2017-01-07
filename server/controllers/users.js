console.log('Server - Users controller loading...');
var mongoose = require('mongoose');
var User = mongoose.model('User');

function UsersController(){

	this.index_others = function(req, res){

		console.log(req.params.id);

		User.find({_id: {$ne: req.params.id}}, function(err, users){
			if (err){
				console.log('error getting unique users from db');
				console.log(err);
			}
			else{
					console.log('successfully retrieved users from db')
					console.log(users);
					res.json(users);	

			}
			
		})
	};


	this.index_all = function(req, res){

		// console.log(req.params.id);

		User.find({}, function(err, users){
			if (err){
				console.log('error getting users from db');
				console.log(err);
			}
			else{
					console.log('successfully retrieved users from db')
					console.log(users);
					res.json(users);	

			}
			
		})
	};

	this.create = function(req, res) {
   		console.log("server - inside user create controller")
   		User.findOne({name: req.body.name}, function(err, user){
   			if (err){
   				console.log("error getting user to check");
   			}
   			else{
   				if(user == null){
   					User.create(req.body, function(err, user){
						if(err){
							console.log("error creating a user...");
						}
						else{
							res.json(user);
						}
 					})

   				}
   				else{
   					console.log("user already exists...");
   					res.json(user);

   				}
   			}
   		})

	};

	this.show = function(req, res){

		User.findById({_id: req.params.id}).populate('_items').exec(function(err, user){
			if (err){
				console.log('error getting a single user from db')
			}
			else{
				console.log('successfully retrieved a single user from db')
			   
	    		res.json(user);	
			}
		})
	};

}


module.exports = new UsersController();