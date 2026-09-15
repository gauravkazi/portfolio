const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema(
    {
        Name:{
            type:String,
            default:'Gaurav Thapa',
        },
        role:{
            type:String,
            default:'Node.js Backend Developer',
        },
        pitch:{
            type:String,
            default:'',
        },
        profilePicture:{
            type:String,
            default:'',
        },
    },
    {timestamps:true}
);
module.exports = mongoose.model('Profile', profileSchema);