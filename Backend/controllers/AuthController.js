const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const Jwt = require('jsonwebtoken');
//Login 
const Login = async (req , res) => {
    try {
        const {email , password } = req.body;
        if(!email || !password) return res.status(403).json({message:"Email and Password are required!"});
        const getUser = await userModel.findOne({email});
        if(!getUser) return res.status(404).json({message:"This email not registered"}) 
        if(getUser && bcrypt.compareSync(password ,getUser.password)){
            const Token = Jwt.sign({userId:getUser._id , isAdmin:getUser.isAdmin},process.env.SECRET_KEY ,{expiresIn:"1d"})
            return res.status(200).json({
                firstName:getUser.firstName,
                lastName:getUser.lastName,
                profileImg:getUser.profileImg,
                email:getUser.email,
                isAdmin:getUser.isAdmin,
                Token
            })
        }
        return res.status(400).json({message:"invalid email or password !"})
    } catch (error) {
        return res.status(400).json({message:error.message})        
    }    
}


// Sign up 
const Register = async (req , res) => {
    try {
        const {firstName , lastName , email , password , confirmPassword } = req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword) return res.status(403).json({message:"All Fields Required!"})
        if(password !== confirmPassword) return res.status(403).json({message:"Password and confirm password must match "})
        //find user 
        const findEmail = await userModel.findOne({email});
        if(findEmail) return res.status(400).json({message:"this email registed before "})
        
        const hashpassword = bcrypt.hashSync(password,10);
        let newuser = new userModel({...req.body , password:hashpassword});
        newuser = await newuser.save();
        if(!newuser) return res.status(500).json({message:"Somthign went wrong !!"});
        return res.status(200).json({message:"Account Created Successfully"});
    } catch (error) {
        return res.status(400).json({message:error.message})        
    }
}

module.exports = {
    Login,
    Register
}