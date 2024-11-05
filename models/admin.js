
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const adminSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    password:{type:String,required:true},
	profilePic: { type: String }
})

adminSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("admin", adminSchema);


const validate = (data) => {
	const schema = Joi.object({
		userName: Joi.string().required().label("User Name"),
		email: Joi.string().email().required().label("Email"),
		mobile: Joi.string().required().label("Mobile"),
		password: passwordComplexity().required().label("Password"),
		//sprofilePic: Joi.string().uri().label("Profile Picture").optional()
	});
	return schema.validate(data);
};

module.exports = { User, validate };