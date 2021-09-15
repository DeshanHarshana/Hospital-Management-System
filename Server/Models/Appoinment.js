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
    
    
});

module.exports=mongoose.model('Appoinment', appoinmnet, "Appoinment");