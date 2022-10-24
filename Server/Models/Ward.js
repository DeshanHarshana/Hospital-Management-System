const mongoose=require('mongoose')

const ward = mongoose.Schema({
   wardid:String,
   doctor:String,
   wardno:String,
   departmentid:String,
   departmentname:String,
   noofbeds:String,
   noofpatients:String 
});

module.exports=mongoose.model('Ward', ward, "Ward");