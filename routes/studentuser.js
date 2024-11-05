
const router = require("express").Router();
const { StudentUser, validate } = require("../models/student");
const bcrypt = require("bcrypt");
const {get,Updated,Delete,profile}= require("../controllers/studentcontroller")


router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await StudentUser.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new StudentUser({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
router.get('/profile/:id',profile)
router.get('/get',get)
router.put('/update/:id',Updated)
router.delete('/delete/:id',Delete)
module.exports = router;