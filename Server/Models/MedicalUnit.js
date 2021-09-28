const mongoose=require('mongoose')

const medicalUnit = mongoose.Schema({
    
    catogary:String,
    Icu:String,
    NIcu:String,
    Scu:String,
    mentorDoc:String,
    countOfDoc:String,
    mentorNur:String,
    countOfNur:String,
    TotalNoBed:String,
    TotalNoEqu:String

});

module.exports=mongoose.model('MedicalUnit', medicalUnit, "medicalUnit");