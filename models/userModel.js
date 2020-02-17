const mongoose = require('mongoose')
var schema = mongoose.Schema
const userSchema = schema({
	profileId: String,
	profileName: String,
	profilePicture: String
})
module.exports=mongoose.model('User',userSchema)