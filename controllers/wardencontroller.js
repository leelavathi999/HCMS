const { WardenUser } = require("../models/warden");


const get=async(req,res)=>{

    try {
      const wardens= await WardenUser.find()
     if (!wardens) {
       return  res.status(404).json({success:false})
     }
 
     res.status(200).json({wardens})
 } catch (error) {
     console.log(error)
     
     res.status(500).json({success:false})
    }
 
 }

 const Updated=async(req,res)=>{
    try {
        const userId=req.params.id
    
    const updateuser=await WardenUser.findByIdAndUpdate(userId,req.body,{new:true})
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
       const deletuser= await WardenUser.findByIdAndDelete(userId)
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
        const user = await WardenUser.findById(req.params.id);
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
module.exports ={ get, Updated , Delete,profile} ;