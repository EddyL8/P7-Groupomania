const mongoose = require('mongoose'); 
const uniqueValidator = require('mongoose-unique-validator'); 

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastname: { type: "string", required: false },
  firstname: { type: "string", required: false },
  isadmin: { type : Boolean ,  default : false ,  required : true },
});

userSchema.plugin(uniqueValidator); 

module.exports = mongoose.model('User', userSchema);