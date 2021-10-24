const mongoose=require('mongoose')

const drug = mongoose.Schema({
    id:Number,
    drugname:String,
    price:Number,
    description:String
});

module.exports=mongoose.model('Drug', drug, "Drug");