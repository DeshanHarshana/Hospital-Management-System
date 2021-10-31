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
    gurdian:String,
    maritalStatus:String,
    weight:String,
    height:String,
    personalAdditional:String,
    bloodsuger:String,
    cholestrol:String,
    bloodpresure:String,
    displayImage:String,
    wardno:Number,
    phone:String,
    reportList:[{
        reportid:String
    }],
    healthAdditional:String,
    subscription:Boolean,
    nic:String,
    doctorlist:[{
        doctorid:String
    }]
    
});

module.exports=mongoose.model('Patient', patient, "Patient");