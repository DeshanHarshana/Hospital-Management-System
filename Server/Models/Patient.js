const mongoose=require('mongoose')

const patient = mongoose.Schema({
    name:String,
    title:String,
    email:String,
    password:String,
    disease:String,
    gender:String,
    age:String,
    city:String,
    guardian:String,
    maritalStatus:String,
    weight:String,
    height:String,
    personalAdditional:String,
    bloodsuger:String,
    cholestrol:String,
    bloodpresure:String,
    displayImage:String,
    wardno:String,
    phone:String,
    reportList:[],
    healthAdditional:String,
    subscription:Boolean,
    nic:String
    
});

module.exports=mongoose.model('Patient', patient, "Patient");