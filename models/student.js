const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const studentSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    password:{type:String,required:true},
    idno:{type:String,required:true},
    hostel:{type:String,required:true},
    roomno:{type:String,required:true}
})

studentSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const StudentUser = mongoose.model("student", studentSchema);


const validate = (data) => {
	const schema = Joi.object({
		userName: Joi.string().required().label("User Name"),
		email: Joi.string().email().required().label("Email"),
		mobile: Joi.string().required().label("Mobile"),
		password: passwordComplexity().required().label("Password"),
        idno: Joi.string().required().label("IdNo"),
        hostel: Joi.string().required().label("Hostel"),
		roomno: Joi.string().required().label("RoonNo"),
	});
	return schema.validate(data);
};

module.exports = { StudentUser, validate };