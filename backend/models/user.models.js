const mongoose = require('mongoose'); 
const uniqueValidator = require('mongoose-unique-validator'); 

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  isAdmin: { type : Boolean ,  default : false ,  required : true },
});

userSchema.plugin(uniqueValidator); 

module.exports = mongoose.model('User', userSchema);