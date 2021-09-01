const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const Admin = require('../Models/Admin');
const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');
const imageUpload = require('../healper/storageDoctor');
const fs = require('fs')
//deshan harshana
//power
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

router.get('/get-all-doctors', function(req,res){
    Doctor.find({}, function(error, result){
        if(error){
            console.log(error);
        }
        else{
            res.send(result);
        }
    });
});




router.get('/get-one-doctor/:id', function(req,res){

    Doctor.findById({_id:req.params.id}, function(error, result){
        if(error){
            console.log(error);
        }
        else{
            res.send(result);
        }
    });
});



//Add Doctor
router.post('/add-new-doctor', function(req,res, next){
    Doctor.findOne({email:req.body.email}, (error, result)=>{
        if(error){
            res.send(error);
        }else{
            if(result){
                res.send({'exist':'yes'})
            }else{
                let doctorData={
                    title:req.body.title,
                    fullname:req.body.fullname,
                    email:req.body.email,
                    password:req.body.password,
                    age:req.body.age,
                    phone:req.body.phone,
                    currentHospital:req.body.currentHospital,
                    currentCity:req.body.currentCity,
                    maritalStatus:req.body.maritalStatus,
                    personalAdditional:req.body.personalAdditional,
                
                
                    degree:req.body.degree,
                    edulevel:req.body.edulevel,
                    eduAdditional:req.body.eduAdditional,
                    displayImage:req.body.displayImage,
                    SLMC:req.body.SLMC,
                    ex:req.body.experiance,
                    position:req.body.position,
                    type:req.body.type
                }
                let doctor= new Doctor(doctorData)
                 doctor.save((error, result)=>{
                    if(error){
                        console.log(error);
                    }
                    else{
                        res.send({'message':"Doctor Added Successfully", 'id':result._id});
                    }
                })
            }
        }
    })
    
});

router.post('/doctor/:postid/uploadPhoto', imageUpload.uploadImage().single('doctorImage'), async (req, res, next)=>{
    
    console.log("Doctor Iamge Name" + req.file.filename);
    let imagePath = 'http://localhost:3000/images/doctors/' + req.file.filename;


     if(req.file){
       console.log("Image Found");
       console.log(req.params.postid)
        Doctor.findByIdAndUpdate(req.params.postid,
            {
              $set:{
                     displayImage:imagePath
              }
            },
              {
                new :true
              },
              function(err,Postdata){
                if(err){
                  res.send("Error update displayImage field");
                }else{
                  res.json(Postdata);
                  console.log("Doctor profile image upload successfully");
              
                }
              }
        
            );

    }
});

router.post('/doctor/:postid/updatePhoto', imageUpload.uploadImage().single('doctorImage'),  (req, res, next)=>{
    const oldlink="";
    Doctor.findById(req.params.id),function(error,user){
        if(error){
            console.log(error)
        }else{
            console.log(user.displayImage)
            oldlink=user.displayImage.split('/')[5];
            console.log(oldlink)
        }
    }


    
    setTimeout(()=>{
    const path = "./images/doctors/"+ oldlink;
    console.log("THis is image " + path) 
    try {
      fs.unlink(path, (err) => {
          if (err) {
            console.error(err)
            return;
          }
        
         console.log("old image deleted");
        })
    } catch (error) {
        console.log(error);
    }
   

  

    console.log("Doctor Iamge Name " + req.file.filename);
    const imagePath = 'http://localhost:3000/images/doctors/' + req.file.filename;
    console.log(imagePath)


    if(req.file){
        console.log("Image Found");
        console.log(req.params.postid)
         Doctor.findByIdAndUpdate(req.params.postid,
             {
               $set:{
                      displayImage:imagePath
               }
             },
               {
                 new :true
               },
               function(err,Postdata){
                 if(err){
                   res.send("Error update displayImage field");
                 }else{
                   res.json(Postdata);
                   console.log("Doctor profile image upload successfully");
               
                 }
               }
         
             );
 
     }
},200)
     
})

router.put('/update-doctor/:id', function(req,res){
    console.log(req.body.displayImage)
    Doctor.findByIdAndUpdate(req.params.id,
        {
            $set:{
                title:req.body.title,
                fullname:req.body.fullname,
                email:req.body.email,
                password:req.body.password,
                age:req.body.age,
                phone:req.body.phone,
                currentHospital:req.body.currentHospital,
                currentCity:req.body.currentCity,
                maritalStatus:req.body.maritalStatus,
                personalAdditional:req.body.personalAdditional,
            
            
                degree:req.body.degree,
                edulevel:req.body.edulevel,
                eduAdditional:req.body.eduAdditional,
                displayImage:req.body.displayImage,
                SLMC:req.body.SLMC,
                ex:req.body.ex,
                position:req.body.position,
                type:req.body.type            
            }
        },{
            new:true
        },function(error,result){
            if(error){
                res.send("Error updating");
            }else{
                res.send(result);
            }
        }
        );
})

router.delete('/delete-doctor/:id', function(req, res){
    const oldlink="";
    Doctor.findById(req.params.id),function(error,user){
        if(error){
            console.log(error)
        }else{
            console.log(user.displayImage)
            oldlink=user.displayImage.split('/')[5];
            console.log(oldlink)
        }
    }


    
    setTimeout(()=>{
    const path = "./images/doctors/"+ oldlink;
    console.log("THis is image " + path) 
    try {
      fs.unlink(path, (err) => {
          if (err) {
            console.error(err)
            return;
          }
        
         console.log("old image deleted");
        })
    } catch (error) {
        console.log(error);
    }
   
    Doctor.deleteOne({_id:req.params.id}, function(err,data){
        if(err){
            res.send(err)
        } else {
            res.send(data);
            console.log("delete success")
        }
     });
    },100);
})


//export model
module.exports=router;
