const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'});
};

// loin admin

const loginAdmin = async(req, res) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:'please fill all fields'});
        }

        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(404).json({message:'invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(400).json({message:'invalid credentials'});
        }
        res.status(200).json({
            _id:admin._id,
            email:admin.email,
            token:generateToken(admin._id),
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports = {loginAdmin};