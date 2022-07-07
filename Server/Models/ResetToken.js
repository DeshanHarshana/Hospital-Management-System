const mongoose = require('mongoose');


const resettokenSchema = new mongoose.Schema({
    email:{
        type:String,
        default:'Unknown'
    },
    token:{
        type:String,
        default:'notoken'
    },
});


module.exports = mongoose.model('passwordResetToken', resettokenSchema);