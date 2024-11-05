const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const wardenSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    hostel:{type:String,required:true},
    mobile:{type:String,required:true},
    password:{type:String,required:true}
})

wardenSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const WardenUser = mongoose.model("warden", wardenSchema);


const validate = (data) => {
	const schema = Joi.object({
		userName: Joi.string().required().label("User Name"),
		email: Joi.string().email().required().label("Email"),
		hostel: Joi.string().required().label("Hostel"),
		mobile: Joi.string().required().label("Mobile"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { WardenUser, validate };