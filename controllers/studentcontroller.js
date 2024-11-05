
const { StudentUser } = require("../models/student");


const get=async(req,res)=>{

    try {
      const students= await StudentUser.find()
     if (!students) {
       return  res.status(404).json({success:false})
     }
 
     res.status(200).json({students})
 } catch (error) {
     console.log(error)
     
     res.status(500).json({success:false})
    }
 
 }

 const Updated=async(req,res)=>{
    try {
        const userId=req.params.id
    
    const updateuser=await StudentUser.findByIdAndUpdate(userId,req.body,{new:true})
      if (!updateuser) {
         return res.status(404).json({ success: false, message: 'User not found' });
       }
        res.status(200).json({ success: true, message: 'User updated successfully', updateuser });
    } catch (error) {
        console.log(error);
       res.status(500).json({ success: false, message: 'Internal server error' });
    }
   }

   const Delete=async(req,res)=>{
    try {
           const userId=req.params.id
       const deletuser= await StudentUser.findByIdAndDelete(userId)
       if (!deletuser) {
       return res.status(404).json({ success: false, message: 'user Not found' });
       }
       res.status(200).json({ success: true, message: 'user Deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
    }
// Get user profile
const profile = async (req, res) => {
    try {
        const user = await StudentUser.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports ={ get, Updated , Delete,profile} ;