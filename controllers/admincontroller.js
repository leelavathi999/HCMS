
const { User } = require("../models/admin");

// Get all users
const get = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ success: false });
        }

        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
};

// Update user
const Updated = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const updateuser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updateuser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User updated successfully', updateuser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Delete user
const Delete = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletuser = await User.findByIdAndDelete(userId);
        if (!deletuser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Get user profile
const profile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { password, ...others } = user._doc;
        res.status(200).json(others);
      //  console.log("Profile retrieved");
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = { get, Updated, Delete, profile };
