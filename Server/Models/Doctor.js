const mongoose=require('mongoose')

const doctor = mongoose.Schema({
    
    email:String,
    password:String,
    
});

module.exports=mongoose.model('Doctor', doctor, "Doctor");