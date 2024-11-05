
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const complaintSchema = new mongoose.Schema({
    complaintId: String,
    type: String,
    purpose: String,
    description: String,

    image: String, 
    status: {
      type: String,
      enum: ['not process yet', 'in process', 'closed'],
      default: 'not process yet'
  },
  createdAt: {
    type: Date,
    default: Date.now
},
student: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentUser', required: true }
  });
   complaintSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
const Complaint = mongoose.model('complaint', complaintSchema);


 


module.exports = { Complaint };