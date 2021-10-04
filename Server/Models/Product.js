const mongoose=require('mongoose')

const product = mongoose.Schema({
    name:String,
    price:String,
    quantity:String,
    category:String,
    availability:Boolean,
    displayImage:String,
    description:String
  
});

module.exports=mongoose.model('Product', product, "Product");