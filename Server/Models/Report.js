const mongoose = require('mongoose')

const report = mongoose.Schema({
    name:String,
    dob:String,
    age:String,
    guardian:String,
    gender:String,
    relationship:String,
    taddress:String,
    paddress:String,
    phone:String,
    occupation:String,
    email:String,
    weight:String,
    height:String,

    heartDisease:Boolean,
    diabetes:Boolean,
    hbp:Boolean,
    canser:Boolean,
    hc:Boolean,
    kidney:Boolean,
    stroke:Boolean,
    dep:Boolean,
    
    /*
   
    
   
    
   
    
    surgeries:String
    */
});

module.exports=mongoose.model('Report', report, "Report");
