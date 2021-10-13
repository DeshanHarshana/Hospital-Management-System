const express=require('express')
const bodyParser=require('body-parser')
const api=require('./Routes/api')
const cors=require('cors')
const path=require('path')
const PORT=3000;

//dgzdfgvzdsgv
const app=express()
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({extended:true}));


app.use('/images/doctors', express.static(path.join('images/doctors/')));
app.use('/images/patients', express.static(path.join('images/patients/')));
app.use('/images/prescription', express.static(path.join('images/prescription/')));


app.use('/', api)


app.listen(PORT, function(){
    console.log('Your Express server running on PORT ' + PORT);
})
