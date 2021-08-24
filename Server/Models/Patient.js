const mongoose=require('mongoose')

const patient = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    
});

module.exports=mongoose.model('Patient', patient, "Patient");