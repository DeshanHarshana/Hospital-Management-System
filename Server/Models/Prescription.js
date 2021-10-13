const mongoose =  require('mongoose')


const prescription = mongoose.Schema({
    name:String,
    area:String,
    pharmacy:String,
    phone:String,
    deliveryAddress:String,
    displayImage: {
        type:String,
        default:'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-8.jpg',
    }
})


module.exports = mongoose.model('prescription', prescription, "prescription");