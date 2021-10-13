const mongoose=require('mongoose')

const pharmacist = mongoose.Schema({
    
    email:String,
    password:String,
    name:String,
   
    
});

module.exports=mongoose.model('pharmacist', pharmacist, "pharmacist");