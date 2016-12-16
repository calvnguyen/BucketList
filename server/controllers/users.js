console.log('Server - Users controller loading...');
var mongoose = require('mongoose');
var User = mongoose.model('User');

function UsersController(){

	this.index = function(req, res){

		User.find({}, function(err, users){
			if (err){
				console.log('error getting users from db')
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
		User.create(req.body, function(err, user){
			if(err){
				console.log("error creating a user...");
			}
			else{
				res.json(user);
			}
 		})
	};

}


module.exports = new UsersController();