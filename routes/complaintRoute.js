
const router = require("express").Router();
const auth = require('../middleware/auth');
const {post,get,put,createComplaint,getUserComplaints,getComplaintHistory}= require('../controllers/complaintcontroller')
createComplaint(router);
// router.post('/post',post)
router.get('/history', getComplaintHistory);

router.get('/get',get)
router.put('/update/:id',put)
router.get('/getUserComplaints', auth, getUserComplaints);
module.exports = router;