const mongoose=require('mongoose')

const patient = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    appointmenttime:String,
    disease:String,
    displayImage:String
    
});

module.exports=mongoose.model('Patient', patient, "Patient");