const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const Admin = require('../Models/Admin');
const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');
const imageUpload = require('../healper/storageDoctor');
const fs = require('fs')
const Ward=require('../Models/Ward');
//deshan harshana
//power
//database connection String
const db="mongodb+srv://thayani:thayani1234@cluster0.1ape7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

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
                        'success':'yes',
                        'doctorid':result._id
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
                        'success':'yes',
                        'patientid':result._id
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
                    password:req.body.password,
                   
                    title:"",
                 
                    disease:"",
                    gender:"",
                    city:"",
                    guardian:"",
                    maritalStatus:"",
                    weight:"",
                    height:"",
                    personalAdditional:"",
                    bloodsuger:"",
                    cholestrol:"",
                    bloodpresure:"",
                    displayImage:"https://www.premierbandsusa.com/pub/media/wysiwyg/smartwave/300.gif",
                    wardno:"",
                    phone:"",
                    reportList:[],
                    healthAdditional:"",
                    subscription:true,
                    nic:""
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



router.get('/get-all-patients', function(req,res){
    Patient.find({}, function(error, result){
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
//get admin data
router.get('/admin-data', function(req,res){
    Admin.find({}, function(error,result){
        if(!error){
            res.send(result);
        }
    });
})
router.get('/get-one-patient/:id', function(req,res){

    Patient.findById({_id:req.params.id}, function(error, result){
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
const patientimageUpload = require('../healper/storagePatient');
const Appoinment = require('../Models/Appoinment');


router.post('/patient/:postid/updatePhoto', patientimageUpload.uploadImage().single('patientImage'),  (req, res, next)=>{
    const oldlink="";
    Patient.findById(req.params.id),function(error,user){
        if(error){
            console.log(error)
        }else{
            console.log(user.displayImage)
            oldlink=user.displayImage.split('/')[5];
            console.log(oldlink)
        }
    }


    
    setTimeout(()=>{
    const path = "./images/patients/"+ oldlink;
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
   

  

    console.log("patient Iamge Name " + req.file.filename);
    const imagePath = 'http://localhost:3000/images/patients/' + req.file.filename;
    console.log(imagePath)


    if(req.file){
        console.log("Image Found");
        console.log(req.params.postid)
         Patient.findByIdAndUpdate(req.params.postid,
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
                   console.log("Patient profile image upload successfully");
               
                 }
               }
         
             );
 
     }
},200)
     
})


router.put('/update-patient/:id', function(req,res){
    console.log(req.body.displayImage)
    Patient.findByIdAndUpdate(req.params.id,
        {
            $set:{
                title:req.body.title,
                fullname:req.body.fullname,
                email:req.body.email,
                age:req.body.age,
                phone:req.body.phone,
                city:req.body.city,
               
                maritalStatus:req.body.maritalStatus,
                personalAdditional:req.body.personalAdditional,
                weight:req.body.weight,
                height:req.body.height,
                healthAdditional:req.body.healthAdditional,
                bloodpresure:req.body.bloodpresure,
                bloodsuger:req.body.bloodsuger,
                cholestrol:req.body.cholestrol,

          
                displayImage:req.body.displayImage,
                nic:req.body.nic,
                gender:req.body.gender,
                subscription:req.body.subscription,
                wardno:req.body.wardno,
                gurdian:req.body.gurdian,
                disease:req.body.disease

                           
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

router.delete('/delete-patient/:id', function(req, res){
    const oldlink="";
    Patient.findById(req.params.id),function(error,user){
        if(error){
            console.log(error)
        }else{
            console.log(user.displayImage)
            oldlink=user.displayImage.split('/')[5];
            console.log(oldlink)
        }
    }


    
    setTimeout(()=>{
    const path = "./images/patients/"+ oldlink;
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
   
    Patient.deleteOne({_id:req.params.id}, function(err,data){
        if(err){
            res.send(err)
        } else {
            res.send(data);
            console.log("delete success")
        }
     });
    },100);
});

router.post('/add-new-appoinment', function(req,res){
   
                let appoinmentData={
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    gender:req.body.gender,
                    dob:req.body.dob,
                    nic:req.body.nic,
                    number:req.body.number,
                    address:req.body.address,
                    service:req.body.service,
                    appoinmentDate:req.body.appoinmentDate,
                    appoinmentTime:req.body.appoinmentTime,
                    doctorname:req.body.doctorname,
                    emargancy:req.body.emargancy,
                    doctorid:req.body.doctorid,
                    patientid:req.body.patientid,
                    status:req.body.status,
                    displayImage:req.body.displayImage,
                    displayImageP:req.body.displayImageP
                }
                let appoinment= new Appoinment(appoinmentData)
                 appoinment.save((error, result)=>{
                    if(error){
                        console.log(error);
                    }
                    else{
                        res.send({'message':"appoinment Added Successfully", 'id':result._id});
                    }
                })
            
    
});

//for patient
router.get('/specificAppoinmentList/:id', function(req,res){
    Appoinment.find({patientid:req.params.id}, function(error,result){
        if(!error){
            res.send(result);
        }
    })
})
//for doctors
router.get('/specificAppoinmentListDoctor/:id', function(req,res){
    Appoinment.find({doctorid:req.params.id}, function(error,result){
        if(!error){
            res.send(result);
        }
    })
});

//in doctor list
router.post('/updateAppoinmentList/:id', function(req,res){
    Doctor.findByIdAndUpdate(req.params.id,{
        $push:{
            appointments:[req.body]
        },
        new :true
    },
        function(error, Result){
            if(error){
                res.send("Error Update Doctor Appoinment List" + error)
            }else{
                res.status(200).send(Result)
            }
        }
    )
});
router.post('/acceptAppoinment/:id', function(req,res){
    Doctor.findByIdAndUpdate(req.params.id,{
        $push:{
            patient:[req.body]
        },
        new :true
    },
        function(error, Result){
            if(error){
                res.send("Error Update Doctor Patient List" + error)
            }else{
                res.status(200).send(Result)
            }
        }
    )
});
router.get('/changeAppoinmentState/:id', function(req,res){
    Appoinment.findByIdAndUpdate(req.params.id,{
        $set:{
            status:"Accepted"
        },

    },
        function(error, Result){
            if(error){
                res.send("Error Update Doctor Patient List" + error)
            }else{
                res.status(200).send(Result)
            }
        }
    )
});


router.post('/doctoraddtopatientlist/:id', function(req,res){
    Patient.findByIdAndUpdate(req.params.id,{
        $push:{
            doctorlist:[req.body]
        },
        new :true
    },
        function(error, Result){
            if(error){
                res.send("Error Update Doctor Patient List" + error)
            }else{
                res.status(200).send(Result)
            }
        }
    )
});

router.put('/deleteAppoinment/:id', function(req,res){
    Doctor.findByIdAndUpdate(
        {
            _id:req.params.id
        },
        {
            $pull:{
                appointments:{
                    appointmentid:req.body.appointmentid
                }
            }
        },
        function(error, Result){
            if(error){
                res.send("Error Deleting appoinment")
            }else{
                res.send(Result);
            }
        }
        )
})

router.delete('/deleteAppoinment2/:id', function(req,res){
    Appoinment.deleteOne({_id:req.params.id}, function(err,data){
        if(err){
            res.send(err)
        } else {
            res.send(data);
            console.log("delete success")
        }
     });
    });

//get doctor's patient list
var patientData=[];
router.get('/getDoctorpatientlist/:id',  function(req,res){
    Doctor.find({_id:req.params.id},'patient', function(error,result){
        if(error){
            console.log("error");
        }else{
            var data=result[0].patient;
          
            
              
             getAllpatientinDoctor(data, getPatierntlist);
             setTimeout(()=>{
                res.send(patientData);
             },1000);
             
        }
    })
});

//Ward details
router.post('/ward-details',function(req,res){
    let warddata = {
        wardid:req.body.wardid,
        wardno:req.body.wardno,
        departmentid:req.body.departmentid,
        departmentname:req.body.departmentname,
        noofbeds:req.body.noofbeds,
        noofpatients:req.body.noofpatients
    }
    let ward=new Ward(warddata)
    ward.save((error,result) => {
        if(error){
            console.log(error)
        }

        else{
            res.send(result);
        }
    })
});

router.get("/get-ward-details/:id",function(req,res){
    Ward.findById({_id:req.params.id},function(error,result){
        if(error){
            console.log(error)
        }
        else{
            res.send(result)
        }
    })
});

router.put("/post-ward-details/:id",function(req,res){
    Ward.findByIdAndUpdate(req.params.id,
        {
            $set:{
                wardid:req.body.wardid,
                wardno:req.body.wardno,
                departmentid:req.body.departmentid,
                departmentname:req.body.departmentname,
                noofbeds:req.body.noofbeds,
                noofpatients:req.body.noofpatients


            }
        },{
            new:true
        }, function(error,result){
            if(error){
                res.send("Error updating");
            }else {
                res.send(result);
            }
        }
        )


});




function getAllpatientinDoctor(data, callback){
    var patientids=[];
    for (var i = 0; i < data.length; i++){
        var obj = data[i];
        var value = obj['patientid'];
        patientids.push(value);
    }
    callback(patientids);
}

async function getPatierntlist(ids){
    const records = await Patient.find({ '_id': { $in: ids } });
    patientData=records;
}

































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


//admin dashboard counts

router.get('/getDashboardData',async function(req,res){
    var data={
        appoinment:0,
        doctor:0,
        patient:0
    }
    data.appoinment = await Appoinment.countDocuments({}).exec();
    data.doctor = await Doctor.countDocuments({}).exec();
    data.patient = await Patient.countDocuments({}).exec();
    res.send(data)

})
//export model
module.exports=router;
