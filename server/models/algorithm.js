// This is the friend.js file located at /server/models/friend.js
// We want to create a file that has the schema for our friends and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');

// create our User Schema
var UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true,  trim: true },
  last_name: { type: String, required: true,  trim: true },
  alias: { type: String, required: true },
  email: { type: String, required: true,  trim: true, lowercase: true, unique: true},
  role: String,
  description: {type: String, text : true},
  password: { type: String, required: true,  minlength: 6,  trim: true },
  security_question: { type: String, required: true,  trim: true },
  security_answer: { type: String, required: true,  trim: true },
  created_at: Date,
  updated_at: Date
});
// use the schema to create the model
mongoose.model('User', UserSchema);
console.log('created User model');
// notice that we aren't exporting anything -- this is because this file will be run when we require it using our config file and then since the model is defined we'll be able to access it from our controller
