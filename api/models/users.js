// defining schema and collection for our database
const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new mongoose.Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
})

// passing the name of the model and the userschmer
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;