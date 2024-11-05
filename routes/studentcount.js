const router = require("express").Router();
const { StudentUser} = require("../models/student");
const { WardenUser } = require("../models/warden");

router.get("/studentcount", async (req, res) => {
    try {
        const studentCount = await StudentUser.countDocuments();
        res.json({ count: studentCount });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

router.get("/wardencount", async (req, res) => {
  try {
      const studentCount = await WardenUser.countDocuments();
      res.json({ count: studentCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


module.exports = router;