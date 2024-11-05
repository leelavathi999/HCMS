
const router = require("express").Router();
const { StudentUser } = require("../models/student");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const user = await StudentUser.findOne({ email: req.body.email });
        if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

        const token = user.generateAuthToken();
        res.status(200).send({ token, userId: user._id, message: "logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
// router.get("/profile", async (req, res) => {
//     try {
//         const user = await StudentUser.findById(req.query.id).select("-password");
//         if (!user) return res.status(404).send({ message: "User not found" });
//         res.status(200).send(user);
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });
router.post('/logout', (req, res) => {
    // Here you can handle any server-side logout logic if needed
    // For example, adding the token to a blacklist (not implemented here)
    
    // Send response indicating successful logout
    res.status(200).json({ message: 'Logout successful' });
});
router.get("/profile", async (req, res) => {
    try {
        const user = await StudentUser.findById(req.query.id).select("-password");
        if (!user) return res.status(404).send({ message: "User not found" });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});
const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;