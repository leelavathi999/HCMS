
const router = require("express").Router();
const { User, validate } = require("../models/admin");

const bcrypt = require("bcrypt");
const {get,Updated,Delete,profile}= require("../controllers/admincontroller")
// ,profile 
const multer = require('multer');
const path = require('path'); // Required to manipulate file paths


router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/')); // Ensure the uploads directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });
// Define the routes with Multer upload middleware for updating user with profile picture
// PUT route to update user information including profile picture
router.put('/update/:id', upload.single('profilePic'), async (req, res) => {
    try {
        const userId = req.params.id;
        const updateFields = req.body;

        if (req.file) {
            updateFields.profilePic = req.file.filename;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User updated successfully', updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/profile/:id',profile)
router.get('/get',get)
router.put('/update/:id', upload.single('profilePic'), Updated);
router.delete('/delete/:id',Delete)
module.exports = router;
