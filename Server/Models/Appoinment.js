const mongoose=require('mongoose')

const appoinmnet = mongoose.Schema({
    firstname:{
        type:String,
        default:'Unknown'
    },
    lastname:{
        type:String,
        default:'Unknown'
    },
    gender:{
        type:String,
        default:'Unknown'
    },
    dob:{
        type:String,
        default:'Unknown'
    },
    nic:{
        type:String,
        default:'Unknown'
    },
    number:{
        type:String,
        default:'Unknown'
    },
    address:{
        type:String,
        default:'Unknown'
    },
    service:{
        type:String,
        default:'Unknown'
    },
    appoinmentDate:{
        type:String,
        default:'Unknown'
    },
    appoinmentTime:{
        type:String,
        default:'Unknown'
    },
    doctorid:{
        type:String,
        default:'Unknown'
    },
    patientid:{
        type:String,
        default:'Unknown'
    },
    emergancy:{
        type:String,
        default:'Unknown'
    },
    doctorname:{
        type:String,
        default:'Unknown'
    },
    status:{
        type:String,
        default:'Unknown'
    },
    displayImage:{
        type:String,
        default:'Unknown'
    }
    
    
});

module.exports=mongoose.model('Appoinment', appoinmnet, "Appoinment");