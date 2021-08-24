const mongoose=require('mongoose')

const admin = mongoose.Schema({
    
    email:String,
    password:String,
    
});

module.exports=mongoose.model('Admin', admin, "Admin");