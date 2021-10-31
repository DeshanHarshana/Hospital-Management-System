const mongoose=require('mongoose')

const doctor = mongoose.Schema({
    title:String,
    fullname:String,
    email:String,
    income:[{
        patientname:String,
        charge:Number,
        date:String
    }],
    password:{
        type:String
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
        default:'https://global4business.com/wp-content/uploads/2020/09/Global4Business-Respizorn-medical-face-masks-instructions-5-512.png'
    },
    SLMC:String,
    ex:String,
    type:String,
    position:String,
    appointments:[{
        appointmentid:String
    }],
    patient:[{
        patientid:String
    }],
    available:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model('Doctor', doctor, "Doctor");