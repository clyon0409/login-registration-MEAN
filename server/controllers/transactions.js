// this is our friends.js file located at /server/controllers/friends.js
// note the immediate function and the object that is returned

// First add the following two lines at the top of the friends controller so that we can access our model through var Friend
// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = (function() {
  return {

  	login: function(req, res){
  		console.log('controller: got into login function')
  		console.log(req.body);
  		User.find({}, function(err,results){
  			if(err){
  				console.log('login funtion: could not find user');
  				res.json({error: 'could not find your credentials'});
  			}else{
  				console.log('login function: found users credentials');
  				console.log(results);
  				res.json(results);
  			}
  		})
  	},

    show_appointments: function(req, res) {

     var now = new Date();
     console.log(now);
     //console.log(now);
      Appointment.find({}).where('date').gt(now).sort({date: 1}).exec(function(err, results) {
		    if(err) {
		      console.log(err);
		    } else {
		    	console.log(results);
		      	res.json(results);
		    }
	  })
  	},

  	register: function(req, res){
  		console.log('transactions: got into register function, req=');
  		console.log(req.body);
  		var entry = new User({first_name: req.body.first_name,
  							  last_name: req.body.last_name,
  							  alias: req.body.alias,
  							  email: req.body.email,
  							  role: 'student',
  							  description: '',
  							  password: req.body.password,
  							  security_question: req.body.security_question,
  							  security_answer: req.body.security_answer,
  							  created_at: new Date(),
  							  updated_at: new Date()
  							});
  		var retVal = entry.save(function(err, result){
  			if(err){
				console.log('could not add new user');
				console.log(err);
				if (err.code === 11000)
					res.json({duplicate: "email address entered already used by another registered user"})
				else
					res.json({errors:err.errors});
			}else{
				console.log('successfully added new user');
				console.log(result);
				res.json(result);
			}
  		});
  	},

	add_appointment: function(req, res){
		new_date = new Date(req.body.date);
		console.log(new_date);
		
		Appointment.count({date: new_date}, function(err, count) {
			console.log('counting number of appointments');
			console.log(count);
		    if(count > 3){
		    	console.log('fully booked');
		    	res.json({error: 'fully booked'});
		    }else{
				var entry = new Appointment({patient_name: req.body.patient_name, date: req.body.date, time:req.body.time, complain: req.body.complain});
				var retVal = entry.save(function(err, result){
					if(err){
						console.log('could not add customer to database');
						console.log(result);
					}else{
						console.log('successfully added an appointmment');
						console.log(result);
						res.json(result);
					}
				});
			}
		});
	},

	edit_appointment: function(req, res){
		console.log('got into edit customer');
		console.log(req.body);
		Appointment.update({_id:req.body.id}, {name:req.body.name}, function(err, data)
		{
			if(err)
				console.log('could not edit ' + req.params.id);
			else{
				console.log('successfully updated friend;');
				res.json({success: 'true'});
			}
		})

	},

	delete_appointment: function(req, res){
		Appointment.remove({_id:req.params.id}, function(err, data)
		{
			if(err)
				console.log('could not remove ' + req.params.id);
			else{
				console.log('successfully removed appointment;');
				res.json({success: 'true'});
			}
		})

	},

	show_orders: function(req, res) {
      Order.find({}, function(err, results) {
		    if(err) {
		      console.log(err);
		    } else {
		    	//console.log(results);
		      	res.json(results);
		    }
	  })
  	},

  	add_order: function(req, res){
  		var date = new Date();
  		console.log(date.toISOString());
		var entry = new Order({customer: req.body.customer, product: req.body.product, quantity: req.body.quantity});
		var resVar = entry.save(function(err, result){
			if(err){
				console.log('could not add order to database');
				console.log(err.errors);
				data = ({status: 'error', errors: err.errors})
				res.json(data);
			}else{
				console.log('successfully added an order');
				console.log(result);
				res.json(result);
			}
		});
	},


  }  //end of wrapper to export all functions
})();