const mongoose=require('mongoose')

const medicalUnit = mongoose.Schema({
    catogory:String,
    mentor:String,
    countOfDoctor:String
});

module.exports=mongoose.model('MedicalUnit', medicalUnit, "medicalUnit");