const mongoose=require('mongoose')

const notification = mongoose.Schema({
    
    patientid:{type:String},
    doctorid:{type:String},
    time:{type:String, default:Date.now()},
    currenttime:{type:String, default:Date.now()},
    content:{type:String, default:"No content"},
    header:{type:String, default:"No header"},
    seen:{type:Boolean, default:false}
    
});

module.exports=mongoose.model('Notification', notification, "Notification");