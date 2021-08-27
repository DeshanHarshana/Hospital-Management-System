const mongoose=require('mongoose')

const doctor = mongoose.Schema({
    title:String,
    fullname:String,
    email:String,
    password:{
        type:String,
        default:'1234'
    },
    age:String,
    phone:String,
    currentHospital:String,
    currentCity:String,
    maritalStatus:String,
    personalAdditional:String,


    degree:String,
    edulevel:String,
    eduAdditional:String,
    displayImage:{
        type:String,
        default:''
    },
    SLMC:String,
    experience:String,
    type:String,
    position:String
});

module.exports=mongoose.model('Doctor', doctor, "Doctor");