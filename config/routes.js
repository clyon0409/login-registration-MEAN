// This is our routes.js file located in /config/routes.js
  // This is where we will define all of our routing rules!

// First at the top of your routes.js file you'll have to require the controller
var transactions = require('./../server/controllers/transactions.js'); 

 // We will have to require this in the server.js file (and pass it app!)
module.exports = function(app) {
	
	app.post('/login', function(req, res) {
		console.log('got into login route');
	  	transactions.login(req, res);
	});

	app.post('/register', function(req, res) {
		console.log('got into register route');
	  	transactions.register(req, res);
	});

	app.get('/appointments', function(req, res) {
		console.log('got into appointments route');
	  	transactions.show_appointments(req, res);
	});

	app.post('/add', function(req, res){
		console.log('routes: got post to add appointment');
		console.log(req.body);
		transactions.add_appointment(req, res);
	}),

	app.get('/delete/:id', function(req, res){
		console.log('routes: got get to delete appointment');
		console.log(req.params.id);
		transactions.delete_appointment(req, res);
	}),

	app.post('/customers/edit', function(req, res){
		console.log('routes: got get to edit customer');
		console.log(req.body);
		transactions.edit_customer(req, res);
	}),

	app.get('/orders', function(req, res) {
		console.log('got into orders route');
	  	transactions.show_orders(req, res);
	}),

	app.post('/orders/add', function(req, res){
		console.log('routes: got post to add order');
		console.log(req.body);
		transactions.add_order(req, res);
	})
}