const mongoose=require('mongoose')

const admin = mongoose.Schema({
    
    email:String,
    password:String,
    fullname:String,
    designation:String,
    displayImage:String
    
});

module.exports=mongoose.model('Admin', admin, "Admin");