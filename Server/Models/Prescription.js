const mongoose =  require('mongoose')


const prescription = mongoose.Schema({
    name:String,
    area:String,
    pharmacy:String,
    phone:String,
    deliveryAddress:String,
    image:String,
})


module.exports = mongoose.model('prescription', prescription, "prescription");