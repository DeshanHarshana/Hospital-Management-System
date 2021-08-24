const express=require('express')
const bodyParser=require('body-parser')
const api=require('./Routes/api')
const cors=require('cors')
const path=require('path')
const PORT=3000;

//start express server
const app=express()
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', api)


app.listen(PORT, function(){
    console.log('Your Express server running on PORT ' + PORT);
})
