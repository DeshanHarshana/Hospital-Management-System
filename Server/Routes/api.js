const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const Admin = require('../Models/Admin');
const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');

//deshan harshana
//Haseen
//database connection String
const db="mongodb+srv://deshan:deshan2233@cluster0.1ape7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//connect with database
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,}, err=>{
    if(err){
        console.log('Error With Connect MongoDB : ' + err)
    }
    else{
        console.log('Database Connect Successfully')
    }
})


//routes

router.get('/', function(req,res){
    res.send('From api route!');
})



// add admin details -- seeding
router.get('/add-admin-data', function(req,res){
    let adminData={
        
        email:"admin@gmail.com",
        password:"1234",
        }
    let admin= new Admin(adminData)
    admin.save((error, result)=>{
        if(error){
            console.log(error);
        }
        else{
            res.send(result);
        }
    })
});

// add doctor details -- seeding
router.get('/add-doctor-data', function(req,res){
    let doctorData={
        
        email:"doctor@gmail.com",
        password:"1234",
        }
    let doctor= new Doctor(doctorData)
    doctor.save((error, result)=>{
        if(error){
            console.log(error);
        }
        else{
            res.send(result);
        }
    })
});

// add patient details -- seeding
router.get('/add-patient-data', function(req,res){
    let patientData={
        
        email:"patient@gmail.com",
        password:"1234",
        }
    let patient= new Patient(patientData)
    patient.save((error, result)=>{
        if(error){
            console.log(error);
        }
        else{
            res.send(result);
        }
    })
});


//login
router.post('/login', function(req,res){
    let userData={
        no:req.body.no,
        email:req.body.email,
        password:req.body.password    
    }
    if(userData.no==1){
        Admin.findOne({email:userData.email}, function(error, result){
            if(error){
                console.log(error);
            }else{
                if(!result){
                    res.send({
                        'user':'no'
                    })
                }else if(result.password!==userData.password){
                    res.send({
                        'password':'no'
                    })
                }else{
                    res.send({
                        'success':'yes'
                    });
                }
            }
        });
    }
    else if(userData.no==2){
        Doctor.findOne({email:userData.email}, function(error, result){
            if(error){
                console.log(error);
            }else{
                if(!result){
                    res.send({
                        'user':'no'
                    })
                }else if(result.password!==userData.password){
                    res.send({
                        'password':'no'
                    })
                }else{
                    res.send({
                        'success':'yes'
                    });
                }
            }
        });
    }
    else if(userData.no==3){
        Patient.findOne({email:userData.email}, function(error, result){
            if(error){
                console.log(error);
            }else{
                if(!result){
                    res.send({
                        'user':'no'
                    })
                }else if(result.password!==userData.password){
                    res.send({
                        'password':'no'
                    })
                }else{
                    res.send({
                        'success':'yes'
                    });
                }
            }
        });
    }

});



// Register Patient

router.post('/signup', function(req, res){
    Patient.findOne({email:req.body.email}, (error, result)=>{
        if(error){
            console.log(error);
        }else{
            if(result){
                res.send({'exist':'yes'})
            }else{
                let patientData={
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
                }
                let patient=new Patient(patientData);
                patient.save(function(error, result){
                    if(error){
                        res.send({'success':'no'});
                    }else{
                        res.send({'success':'yes'});
                    }
                });
            }
        }
    })
});




//export model
module.exports=router;
