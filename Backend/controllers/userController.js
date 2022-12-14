const userModle = require('../models/user');


//get all users 
const getAllUsers = async (req , res) => {
    return res.status(200).json(res.paginationData)
}

//delete User 
const DeleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        let DeletedUser = await userModle.findByIdAndDelete(id)
        if(!DeletedUser) return res.status(500).json({message:"Something went wrong!"})
        return res.status(200).json({message:"User Deleted Successfully"})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
//edit user 
const EditUser = async (req , res) => {
    try {
        const {id} = req.params;
        let newuser = await userModle.findByIdAndUpdate(id,req.body,{new:true});
        if(!newuser) return res.status(500).json({message:"Something went wrong"});
        return res.status(200).json({success:true,data:newuser})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
// delete user 
const deleteUSer = async (req , res) => {
    try {
        const {id} = req.params;
        let user = await userModle.findByIdAndDelete(id);
        if(!user) return res.status(404).json({status:"error" , message:"user not found "});
        return res.status(200).json({success:true , message:"Deleted Successfully"})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
module.exports = {
    getAllUsers,
    DeleteUser,
    EditUser,
    deleteUSer
}