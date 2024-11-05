
const {Complaint} = require('../models/complaint');
const multer = require('multer');
const upload = multer(); 

const jwt = require('jsonwebtoken');
const { StudentUser } = require("../models/student");

// Route to handle form submission
const post = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Get the token from the Authorization header
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY); // Verify the token
    const studentId = decoded._id; // Get the student ID from the token
    const { complaintId, type, purpose, description } = req.body;
    const image = req.file ? req.file.buffer : null;
    
    // Create a new complaint document
    const newComplaint = new Complaint({
      complaintId,
      type,
      purpose,
      description,
      image,
     student: studentId
    });

    // Save the complaint to MongoDB
    await newComplaint.save();

    // Send a success response
    res.status(201).json({ message: 'Complaint submitted successfully', complaint: newComplaint });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({ error: 'Failed to submit complaint' });
  }
};

// Route to handle form submission
const createComplaint = (router) => {
  router.post('/post', upload.single('image'), post);
};

const getComplaintHistory = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Get token from header
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const studentId = decoded._id;

    const complaints = await Complaint.find({ student: studentId });
    res.status(200).json({ complaints: complaints || [] });
  } catch (error) {
    console.error('Error retrieving complaint history:', error);
    res.status(500).json({ error: 'Failed to retrieve complaint history' });
  }
};
const getUserComplaints = async (req, res) => {
  try {
      const studentId = req.user._id; // Assuming req.user contains the authenticated user's info
      const complaints = await Complaint.find({ student: studentId });
      res.json(complaints);
  } catch (error) {
      console.error('Error fetching user complaints:', error);
      res.status(500).json({ error: 'Failed to fetch complaints' });
  }
};
const get = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.json(complaints);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
// Update complaint status
const put = async (req, res) => {
  try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedComplaint = await Complaint.findByIdAndUpdate(
          id,
          { status },
          { new: true } // Return the updated document
      );

      if (!updatedComplaint) {
          return res.status(404).json({ message: 'Complaint not found' });
      }

      res.json(updatedComplaint);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};
  module.exports ={post,get,put,createComplaint,getUserComplaints,getComplaintHistory} ;