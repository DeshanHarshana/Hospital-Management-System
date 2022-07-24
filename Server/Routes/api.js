const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Admin = require('../Models/Admin');
const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');
const imageUpload = require('../healper/storageDoctor');
const fs = require('fs')

const Prescription = require('../Models/Prescription');

const Ward=require('../Models/Ward');
const Product=require('../Models/Product');
const bcrypt = require("bcrypt");
//deshan harshana
//power
//database connection String

//const db="mongodb://localhost:2717/myFirstDatabase?retryWrites=true&w=majority"; // for docker running
const db = "mongodb+srv://deshan:deshan2233@cluster0.1ape7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//const db = "mongodb+srv://deshan:deshan2233@cluster0.1ape7.mongodb.net/Host?retryWrites=true&w=majority"


//connect with database
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}, err => {
    if (err) {
        console.log('Error With Connect MongoDB : ' + err)
    }
    else {
        console.log('Database Connect Successfully')
    }
})


//routes

router.post('/patient-fogot-password', async function(req,res){
    const salt = await bcrypt.genSalt(5)
    const x= await bcrypt.hash(req.body.newpassword, salt);
    Patient.findOneAndUpdate({email:req.body.email},
                    {
                        $set: {
                            password: x,
                            
                        }
                    }, {
                    new: true
                }, function (error, result) {
                    if (error) {
                        res.send({"message":"Error updating"});
                    } else {
                        console.log("successfully uodated")
                        res.send({"message":"successfully updated"});
                    }
                }
                );
                //res.send({"message":x})

});
router.post('/doctor-fogot-password', async function(req,res){
    const salt = await bcrypt.genSalt(5)
    const x= await bcrypt.hash(req.body.newpassword, salt);
    Doctor.findOneAndUpdate({email:req.body.email},
                    {
                        $set: {
                            password: x,
                            
                        }
                    }, {
                    new: true
                }, function (error, result) {
                    if (error) {
                        res.send({"message":"Error updating"});
                    } else {
                        console.log("successfully uodated")
                        res.send({"message":"successfully updated"});
                    }
                }
                );
                //res.send({"message":x})

})

router.get('/', function (req, res) {
    res.send('From api route!');
})

router.post('/doctor-reset-password', async function(req,res){
    var doctorid=req.body.doctorid;

    Doctor.findById(doctorid, async (error,result)=>{
        if(error){
            res.send({"message":"no user"})
        }else{
           
            const validPassword = await bcrypt.compare(req.body.currentPassword, result.password);
            if(validPassword){
                const salt = await bcrypt.genSalt(5)
                const x= await bcrypt.hash(req.body.newpassword, salt);
                Doctor.findByIdAndUpdate(doctorid,
                    {
                        $set: {
                            password: x,
                            
                        }
                    }, {
                    new: true
                }, function (error, result) {
                    if (error) {
                        res.send({"message":"Error updating"});
                    } else {
                        console.log("successfully uodated")
                        res.send({"message":"successfully updated"});
                    }
                }
                );
                //res.send({"message":x})

            }else{
                res.send({"message":"wrong password"})
            }
        }
    })
    //res.send(req.body)
    //const validPassword = await bcrypt.compare(userData.password, result.password);
                    
})
router.post('/patient-reset-password', async function(req,res){
    var patientid=req.body.patientid;

    Patient.findById(patientid, async (error,result)=>{
        if(error){
            res.send({"message":"no user"})
        }else{
            
           
            const validPassword = await bcrypt.compare(req.body.currentPassword, result.password);
            if(validPassword){
                const salt = await bcrypt.genSalt(5)
                const x= await bcrypt.hash(req.body.newpassword, salt);
                Patient.findByIdAndUpdate(patientid,
                    {
                        $set: {
                            password: x,
                            
                        }
                    }, {
                    new: true
                }, function (error, result) {
                    if (error) {
                        res.send({"message":"Error updating"});
                    } else {
                        console.log("successfully uodated")
                        res.send({"message":"successfully updated"});
                    }
                }
                );
                //res.send({"message":x})

            }else{
                res.send({"message":"wrong password"})
            }
        }
    })
    //res.send(req.body)
    //const validPassword = await bcrypt.compare(userData.password, result.password);
                    
})


// add admin details -- seeding
router.get('/add-admin-data', async function (req, res) {
    const salt = await bcrypt.genSalt(5)
    const x= await bcrypt.hash("1234", salt);
    console.log(x);
    let adminData = {

        email: "deshan@gmail.com",
        password: x,
    }
    let admin = new Admin(adminData)
    admin.save((error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send(result);
        }
    })
});



// add patient details -- seeding
router.get('/add-patient-data', function (req, res) {
    let patientData = {

        email: "patient@gmail.com",
        password: "1234",
    }
    let patient = new Patient(patientData)
    patient.save((error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send(result);
        }
    })
});


//login
router.post('/login',  function (req, res) {
    console.log(req.body)
    let userData = {
        no: req.body.no,
        email: req.body.email,
        password: req.body.password
    }
    if (userData.no == 1) {
        Admin.findOne({ email: userData.email },async function (error, result) {
            if (error) {
                console.log(error);
            } else {
                if (!result) {
                    res.send({
                        'user': 'no'
                    })
                } else{
                    const validPassword = await bcrypt.compare(userData.password, result.password);
                    
                    if(!validPassword){
                    res.send({
                        'password': 'no'
                    })}
                    else{
                        res.send({
                            'success': 'yes'
                        });
                    }
                } 
            }
        });
    }
    else if (userData.no == 2) {
        Doctor.findOne({ email: userData.email }, async function (error, result) {
            if (error) {
                console.log(error);
            } else {
                if (!result) {
                    res.send({
                        'user': 'no'
                    })
                } else{
                    const validPassword = await bcrypt.compare(userData.password, result.password);
                    
                    if(!validPassword){
                    res.send({
                        'password': 'no'
                    })}
                    else{
                        res.send({
                            'success': 'yes',
                            'doctorid':result._id
                        });
                    }
                } 
            }
        });
    }
    else if (userData.no == 3) {
        Patient.findOne({ email: userData.email }, async function (error, result) {
            if (error) {
                console.log(error);
            } else {
                if (!result) {
                    res.send({
                        'user': 'no'
                    })
                }else{
                    const validPassword = await bcrypt.compare(userData.password, result.password);
                    
                    if(!validPassword){
                    res.send({
                        'password': 'no'
                    })}
                    else{
                        res.send({
                            'success': 'yes',
                            'patientid':result._id
                        });
                    }
                } 
            }
        });
    }
    else if (userData.no == 4) {
        Pharmacist.findOne({ email: userData.email }, async function (error, result) {
            if (error) {
                console.log(error);
            } else {
                if (!result) {
                    res.send({
                        'user': 'no'
                    })
                } else{
                    const validPassword = await bcrypt.compare(userData.password, result.password);
                    
                    if(!validPassword){
                    res.send({
                        'password': 'no'
                    })}
                    else{
                        res.send({
                            'success': 'yes',
                            'pharmacistid':result._id
                        });
                    }
                } 
            }
        });
    }

});



// Register Patient

router.post('/signup', function (req, res) {
    Patient.findOne({ email: req.body.email }, async (error, result) => {
        if (error) {
            console.log(error);
        } else {
            if (result) {
                res.send({ 'exist': 'yes' })
            } else {
                const salt = await bcrypt.genSalt(5)
                const x= await bcrypt.hash(req.body.password, salt);
                let patientData = {
                    name: req.body.name,
                    email: req.body.email,
                    password: x,

                    title: "",

                    disease: "",
                    gender: "",
                    city: "",
                    guardian: "",
                    maritalStatus: "",
                    weight: "",
                    height: "",
                    personalAdditional: "",
                    bloodsuger: "",
                    cholestrol: "",
                    bloodpresure: "",
                    displayImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png",
                    wardno: "",
                    phone: "",
                    reportList: [],
                    healthAdditional: "",
                    subscription: true,
                    nic: ""
                }
                let patient = new Patient(patientData);
                patient.save(function (error, result) {
                    if (error) {
                        res.send({ 'success': 'no' });
                    } else {
                        res.send({ 'success': 'yes' });
                    }
                });
            }
        }
    })
});

router.get('/get-all-doctors', function (req, res) {
    Doctor.find({}, function (error, result) {
        if (error) {
            console.log(error);
        }
        else {
            res.send(result);
        }
    });
});



router.get('/get-all-patients', function(req,res){
    Patient.find({}, function(error, result){
        if(error){
            console.log(error);
        }
        else {
            res.send(result);
        }
    });
});


router.get('/get-one-doctor/:id', function (req, res) {

    Doctor.findById({ _id: req.params.id }, function (error, result) {
        if (error) {
            console.log(error);
        }
        else {
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
router.get('/doctor-data', function(req,res){
    Doctor.find({}, function(error,result){
        if(!error){
            res.send(result);
        }
    });
})
router.get('/get-one-patient/:id', function(req,res){

    Patient.findById({ _id: req.params.id }, function (error, result) {
        if (error) {
            console.log(error);
        }
        else {
            res.send(result);
        }
    });
});


//add report
router.post('/add-report', function (req, res) {
                let reportData = {
                name: req.body.name,
                dob: req.body.dob,
                age:req.body.age,
                guardian: req.body.guardian,
                gender: req.body.gender,
                relationship:req.body.relationship,
                taddress: req.body.taddress,
                paddress: req.body.paddress,
                phone: req.body.phone,
                email: req.body.email,
                occupation: req.body.occupation,
                weight: req.body.weight,
                height: req.body.height,
                 heartDisease:req.body.heartDisease,
                diabetes:req.body.diabetes,
                hbp:req.body.hbp,
                canser:req.body.canser,
                hc:req.body.hc,
                kidney:req.body.kidney,
                stroke:req.body.stroke,
                dep:req.body.dep,
                surgeries:req.body.surgeries,
                medications:req.body.medications,
                latex:req.body.latex,
                iodine:req.body.iodine,
                bromine:req.body.bromine,
                description:req.body.description,
                date:req.body.date,
                sign:req.body.sign,
                nic:req.body.nic,

                doctorid:req.body.doctorid,
                patientid:req.body.patientid,
                doctorname:req.body.doctorname

                
                }
                let report = new Report(reportData)
                report.save((error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        res.send({ 'message': "Report Added Successfully!", 'id': result._id });
                    }
                })
            
});

    
//edit report
router.put('/updateReport/:id', function (req, res) {
    Report.findByIdAndUpdate(req.params.id,
        {
            $set: {
                    name: req.body.name,
                    dob: req.body.dob,
                    age:req.body.age,
                    guardian: req.body.guardian,
                    gender: req.body.gender,
                    relationship:req.body.relationship,
                    taddress: req.body.taddress,
                    paddress: req.body.paddress,
                    phone: req.body.phone,
                    email: req.body.email,
                    occupation: req.body.occupation,
                    weight: req.body.weight,
                    height: req.body.height,
                    heartDisease:req.body.heartDisease,
                    diabetes:req.body.diabetes,
                    hbp:req.body.hbp,
                    canser:req.body.canser,
                    hc:req.body.hc,
                    kidney:req.body.kidney,
                    stroke:req.body.stroke,
                    dep:req.body.dep,
                    surgeries:req.body.surgeries,
                    medications:req.body.medications,
                    latex:req.body.latex,
                    iodine:req.body.iodine,
                    bromine:req.body.bromine,
                    description:req.body.description,
                    date:req.body.date,
                    sign:req.body.sign,
                    nic:req.body.nic,

                    doctorid:req.body.doctorid,
                    patientid:req.body.patientid,
                    doctorname:req.body.doctorname

                    
            }
        }, {
        new: true
    }, function (error, result) {
        if (error) {
            res.send("Error updating");
        } else {
            res.send(result);
        }
    }
    );


});


    

    



//Add Doctor
router.post('/add-new-doctor', function (req, res, next) {
    Doctor.findOne({ email: req.body.email }, async (error, result) => {
        if (error) {
            res.send(error);
        } else {
            if (result) {
                res.send({ 'exist': 'yes' })
            } else {
                const salt = await bcrypt.genSalt(5)
                const x= await bcrypt.hash("1234", salt);
                let doctorData = {
                    title: req.body.title,
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: x,
                    age: req.body.age,
                    phone: req.body.phone,
                    currentHospital: req.body.currentHospital,
                    currentCity: req.body.currentCity,
                    maritalStatus: req.body.maritalStatus,
                    personalAdditional: req.body.personalAdditional,


                    degree: req.body.degree,
                    edulevel: req.body.edulevel,
                    eduAdditional: req.body.eduAdditional,
                    displayImage: req.body.displayImage,
                    SLMC: req.body.SLMC,
                    ex: req.body.experiance,
                    position: req.body.position,
                    type: req.body.type
                }
                let doctor = new Doctor(doctorData)
                doctor.save((error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        res.send({ 'message': "Doctor Added Successfully", 'id': result._id });
                    }
                })
            }
        }
    })

});

router.post('/doctor/:postid/uploadPhoto', imageUpload.uploadImage().single('doctorImage'), async (req, res, next) => {

    console.log("Doctor Iamge Name" + req.file.filename);
    let imagePath = 'http://localhost:3000/images/doctors/' + req.file.filename;


    if (req.file) {
        console.log("Image Found");
        console.log(req.params.postid)
        Doctor.findByIdAndUpdate(req.params.postid,
            {
                $set: {
                    displayImage: imagePath
                }
            },
            {
                new: true
            },
            function (err, Postdata) {
                if (err) {
                    res.send("Error update displayImage field");
                } else {
                    res.json(Postdata);
                    console.log("Doctor profile image upload successfully");

                }
            }

        );

    }
});

router.post('/doctor/:postid/updatePhoto', imageUpload.uploadImage().single('doctorImage'), (req, res, next) => {
    const oldlink = "";
    Doctor.findById(req.params.id), function (error, user) {
        if (error) {
            console.log(error)
        } else {
            console.log(user.displayImage)
            oldlink = user.displayImage.split('/')[5];
            console.log(oldlink)
        }
    }



    setTimeout(() => {
        const path = "./images/doctors/" + oldlink;
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


        if (req.file) {
            console.log("Image Found");
            console.log(req.params.postid)
            Doctor.findByIdAndUpdate(req.params.postid,
                {
                    $set: {
                        displayImage: imagePath
                    }
                },
                {
                    new: true
                },
                function (err, Postdata) {
                    if (err) {
                        res.send("Error update displayImage field");
                    } else {
                        res.json(Postdata);
                        console.log("Doctor profile image upload successfully");

                    }
                }

            );

        }
    }, 200)

})
const patientimageUpload = require('../healper/storagePatient');
const Report = require('../Models/Report');
const Appoinment = require('../Models/Appoinment');
const MedicalUnit = require('../Models/MedicalUnit');


const { strictEqual } = require('assert');




router.post('/patient/:postid/updatePhoto', patientimageUpload.uploadImage().single('patientImage'), (req, res, next) => {
    const oldlink = "";
    Patient.findById(req.params.id), function (error, user) {
        if (error) {

            console.log(error)
        } else {
            console.log(user.displayImage)
            oldlink = user.displayImage.split('/')[5];
            console.log(oldlink)
        }
    }



    setTimeout(() => {
        const path = "./images/patients/" + oldlink;
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


        if (req.file) {
            console.log("Image Found");
            console.log(req.params.postid)
            Patient.findByIdAndUpdate(req.params.postid,
                {
                    $set: {
                        displayImage: imagePath
                    }
                },
                {
                    new: true
                },
                function (err, Postdata) {
                    if (err) {
                        res.send("Error update displayImage field");
                    } else {
                        res.json(Postdata);
                        console.log("Patient profile image upload successfully");

                    }
                }

            );

        }
    }, 200)

})


router.put('/update-patient/:id', function (req, res) {
    console.log(req.body.displayImage)
    Patient.findByIdAndUpdate(req.params.id,
        {
            $set: {
                title: req.body.title,
                fullname: req.body.fullname,
                email: req.body.email,
                age: req.body.age,
                phone: req.body.phone,
                city: req.body.city,

                maritalStatus: req.body.maritalStatus,
                personalAdditional: req.body.personalAdditional,
                weight: req.body.weight,
                height: req.body.height,
                healthAdditional: req.body.healthAdditional,
                bloodpresure: req.body.bloodpresure,
                bloodsuger: req.body.bloodsuger,
                cholestrol: req.body.cholestrol,


                displayImage: req.body.displayImage,
                nic: req.body.nic,
                gender: req.body.gender,
                subscription: req.body.subscription,
                wardno: req.body.wardno,
                gurdian: req.body.gurdian,
                disease: req.body.disease


            }
        }, {
        new: true
    }, function (error, result) {
        if (error) {
            res.send("Error updating");
        } else {
            res.send(result);
        }
    }
    );
})

router.delete('/delete-patient/:id', function (req, res) {
    const oldlink = "";
    Patient.findById(req.params.id), function (error, user) {
        if (error) {
            console.log(error)
        } else {
            console.log(user.displayImage)
            oldlink = user.displayImage.split('/')[5];
            console.log(oldlink)
        }
    }



    setTimeout(() => {
        const path = "./images/patients/" + oldlink;
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

        Patient.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) {
                res.send(err)
            } else {
                res.send(data);
                console.log("delete success")
            }
        });
    }, 100);
     });
   
//get all appoinment
router.get('/getAllAppoinments', function(req,res){
    Appoinment.find({}, (error, result)=>{
        if(!error){
            res.send(result);
        }
    })
})

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
    

//get patient's doctor list
var doctorData=[];
router.get('/getPatientDoctorlist/:id',  function(req,res){
    Patient.find({_id:req.params.id},'doctorlist', function(error,result){
        if(error){
            console.log("error");
        }else{
            var data=result[0].doctorlist;
          
            
              
             getAllDoctorsinPatient(data, getDoctorList);
             setTimeout(()=>{
                res.send(doctorData);
             },1000);
             
        }
    })
});
function getAllDoctorsinPatient(data, callback){
    var doctorids=[];
    for (var i = 0; i < data.length; i++){
        var obj = data[i];
        var value = obj['doctorid'];
        doctorids.push(value);
    }
    callback(doctorids);
}

async function getDoctorList(ids){
    const records = await Doctor.find({ '_id': { $in: ids } });
    doctorData=records;
}


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
                doctor:req.body.doctor,
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



//get patients report list
var reportData=[];
router.get('/getPatientReportList/:id',  function(req,res){
    Patient.find({_id:req.params.id},'reportList', function(error,result){
        if(error){
            console.log("error");
        }else{
            var data=result[0].reportList;
          
            
              
            getAllreportsinPatient(data, getReportData);
             setTimeout(()=>{
                res.send(reportData);
             },1000);
             
        }
    })
});

function getAllreportsinPatient(data, callback){
    var reportids=[];
    for (var i = 0; i < data.length; i++){
        var obj = data[i];
        var value = obj['reportid'];
        reportids.push(value);
    }
    callback(reportids);
}

async function getReportData(ids){
    const records = await Report.find({ '_id': { $in: ids } });
    reportData=records;
}





//get one report data
router.get('/getSingleReport/:id', function(req,res){
    Report.findOne({"_id":req.params.id}, function(error, result){
        if(error){
            console.log(error);
        }else{
            res.send(result);
        }
    })
})

router.put('/addreporttopatient-reportlist/:id', function(req, res){
    Patient.findByIdAndUpdate(req.params.id,{
        $push:{
            reportList:[req.body]
        },
        new :true
    },
        function(error, Result){
            if(error){
                res.send("Error Update Report List" + error)
            }else{
                res.status(200).send(Result)
            }
        }
    )
})


//delete reportid from patient report list
router.put('/deleteReportfromList/:id', function(req,res){
    Patient.findByIdAndUpdate(
        {
            _id:req.params.id
        },
        {
            $pull:{
                reportList:{
                    reportid:req.body.reportid
                }
            }
        },
        function(error, Result){
            if(error){
                res.send("Error Deleting Report")
            }else{
                res.send(Result);

            }
        }
        )
})


router.put('/update-doctor/:id', function (req, res) {
    console.log(req.body.displayImage)
    Doctor.findByIdAndUpdate(req.params.id,
        {
            $set: {
                title: req.body.title,
                fullname: req.body.fullname,
                email: req.body.email,
                age: req.body.age,
                phone: req.body.phone,
                currentHospital: req.body.currentHospital,
                currentCity: req.body.currentCity,
                maritalStatus: req.body.maritalStatus,
                personalAdditional: req.body.personalAdditional,


                degree: req.body.degree,
                edulevel: req.body.edulevel,
                eduAdditional: req.body.eduAdditional,
                displayImage: req.body.displayImage,
                SLMC: req.body.SLMC,
                ex: req.body.ex,
                position: req.body.position,
                type: req.body.type
            }
        }, {
        new: true
    }, function (error, result) {
        if (error) {
            res.send("Error updating");
        } else {
            res.send(result);
        }
    }
    );
})

router.delete('/delete-doctor/:id', function (req, res) {
    const oldlink = "";
    Doctor.findById(req.params.id), function (error, user) {
        if (error) {
            console.log(error)
        } else {
            console.log(user.displayImage)
            oldlink = user.displayImage.split('/')[5];
            console.log(oldlink)
        }
    }



    setTimeout(() => {
        const path = "./images/doctors/" + oldlink;
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
        

        Doctor.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) {
                res.send(err)
            } else {
                res.send(data);
                console.log("delete success")
            }
        });
    }, 100);
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



//calendar data loading
var appoinmentData=[];
router.get('/calendarDataLoadingDoctor/:id',  function(req,res){
    Doctor.find({_id:req.params.id},'appointments', function(error,result){
        if(error){
            console.log("error");
        }else{
            var data=result[0].appointments;
          
            
              
            getAllDoctorAppoinments(data, getAppoinmentlist);
             setTimeout(()=>{
                res.send(appoinmentData);
             },1000);
             
        }
    })
});

function getAllDoctorAppoinments(data, callback){
    var appoinmentids=[];
    for (var i = 0; i < data.length; i++){
        var obj = data[i];
        var value = obj['appointmentid'];
        appoinmentids.push(value);
    }
    callback(appoinmentids);
}

async function getAppoinmentlist(ids){
    const records = await Appoinment.find({ '_id': { $in: ids } });
    appoinmentData=records;
}



//medicalunit
router.post('/add-medical-data',function(req,res){
    let medicalUnitdata = {

        catogary:req.body.catogary,
        Icu:req.body.Icu,
        NIcu:req.body.NIcu,
        Scu:req.body.Scu,
        mentorDoc:req.body.mentorDoc,
        countOfDoc:req.body.countOfDoc,
        mentorNur:req.body.mentorNur,
        countOfNur:req.body.countOfNur,
        TotalNoBed:req.body.TotalNoBed,
        TotalNoEqu:req.body.TotalNoEqu
    }
    let medicalunit = new MedicalUnit(medicalUnitdata)
    medicalunit.save((error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send(result);
        }
    });
})

router.get('/get-medical-data/:id',function(req,res){
    MedicalUnit.findById({_id:req.params.id},function(error,result){
        if(error){
            console.log(error)
        }
        else
        {
            res.send(result)
        }

    })
})

router.put('/postmedicaldata/:id',function(req,res){

    MedicalUnit.findByIdAndUpdate(req.params.id,
        {
            $set: {
                catogary:req.body.catogary,
                Icu:req.body.Icu,
                NIcu:req.body.NIcu,
                Scu:req.body.Scu,
                mentorDoc:req.body.mentorDoc,
                countOfDoc:req.body.countOfDoc,
                mentorNur:req.body.mentorNur,
                countOfNur:req.body.countOfNur,
                TotalNoBed:req.body.TotalNoBed,
                TotalNoEqu:req.body.TotalNoEqu
            }
        }, {
        new: true
    }, function (error, result) {
        if (error) {
            res.send("Error updating");
        } else {
            res.send(result);
        }
    }
    );

})

//delete report
router.delete('/deleteReport/:id', function(req,res){
    Report.deleteOne({_id:req.params.id}, function(err,data){
        if(err){
            res.send(err)
        } else {
            res.send(data);
            console.log("delete success")
        }
     });
    });

//doctor available change

router.put('/changeAvailability/:id', function(req,res){
    Doctor.findByIdAndUpdate(req.params.id,
        {
            $set: {
                available:req.body.available
            }
        }, {
        new: true
    }, function (error, result) {
        if (error) {
            res.send("Error updating");
        } else {
            res.send(result);
        }
    }
    );
})

router.put('/adminSign/:id', function(req,res){
    console.log(req.body)
    Prescription.findByIdAndUpdate(req.params.id,
        {
            $set: {
                adminSign:req.body.adminSign
            }
        }, {
        new: true
    }, function (error, result) {
        if (error) {
            res.send("Error updating");
        } else {
            res.send(result);
        }
    }
    );
})


//product availablity
router.put('/productAvailability/:id', function(req,res){
    Product.findByIdAndUpdate(req.params.id,
        {
            $set: {
                availability:req.body.availability
            }
        }, {
        new: true
    }, function (error, result) {
        if (error) {
            res.send("Error updating");
        } else {
            res.send(result);
        }
    }
    );
})


//Post pharmacy data
router.post('/add-Prescription', function(req, res){
    let prescriptionData = {
        patientid:req.body.patientid,
        doctorid:req.body.doctorid,
        patientname:req.body.patientname,
        doctorname:req.body.doctorname,
        date:req.body.date,
        medicine:req.body.medicine

    }
    let prescription = new Prescription(prescriptionData)
    prescription.save((error, result)=>{
        if(error){
            console.log(error);
        }
        else
        {
            res.send(result);
        }
       
    })
});

router.get('/getPrescription/:id', (req, res)=>{
    Prescription.find({patientid:req.params.id}, (error, result)=>{
        if(!error){
            res.send(result);
        }
    })
})


//getMedicine
router.get('/getProducts', function(req,res){
    Product.find({}, (error, result)=>{
        if(error){
            console.log(error)
        }else{
            res.send(result)
        }
    })
});

router.get('/getPhamasisit/:id', function(req,res){
    Pharmacist.findOne({_id:req.params.id}, (error, result)=>{
        if(error){
            res.send({message:"error"})
        }else{
            res.send(result);
        }
    })
})

router.get('/getProduct/:id', function(req,res){
    Product.findOne({_id:req.params.id}, (error, result)=>{
        if(error){
            console.log(error)
        }else{
            res.send(result)
        }
    })
});

router.post('/addProduct', function(req,res){
    let productData={
        name:req.body.name,
        price:req.body.price,
        quantity:req.body.quantity,
        availability:req.body.availability,
        displayImage:req.body.displayImage,
        description:req.body.description,
        category:req.body.category 
  
    }

    let product =new Product(productData);
    product.save((error, result)=>{
        if(error){
            console.log(error)
        }else{
            res.send({'message':"Product Added Successfully", 'id':result._id});
        }
    })
})

router.put('/editProduct/:id', function(req,res){
    
    Product.findByIdAndUpdate(req.params.id,
        {
            $set: {
                name:req.body.name,
                price:req.body.price,
                quantity:req.body.quantity,
                availability:req.body.availability,
                displayImage:req.body.displayImage,
                description:req.body.description,
                category:req.body.category 
            }
        }, {
        new: true
    }, function (error, result) {
        if (error) {
            res.send("Error updating");
        } else {
            res.send(result);
        }
    }
    );
})
router.delete('/deleteProduct/:id', function(req,res){
    Product.deleteOne({_id:req.params.id}, function(err,data){
        if(err){
            res.send(err)
        } else {
            res.send(data);
            console.log("delete success")
        }
     });
    });

//add product
const productimageUpload = require('../healper/storageProduct');
const Pharmacist = require('../Models/Pharmacist');


router.post('/product/:postid/uploadPhoto', productimageUpload.uploadImage().single('productImage'), async (req, res, next) => {

    console.log("Product Iamge Name" + req.file.filename);
    let imagePath = 'http://localhost:3000/images/products/' + req.file.filename;


    if (req.file) {
        console.log("Image Found");
        console.log(req.params.postid)
        Product.findByIdAndUpdate(req.params.postid,
            {
                $set: {
                    displayImage: imagePath
                }
            },
            {
                new: true
            },
            function (err, Postdata) {
                if (err) {
                    res.send("Error update displayImage field");
                } else {
                    res.json(Postdata);
                    console.log("Product image upload successfully");

                }
            }

        );

    }
});

router.post('/product/:postid/updatePhoto', productimageUpload.uploadImage().single('productImage'), (req, res, next) => {
    const oldlink = "";
    Product.findById(req.params.id), function (error, user) {
        if (error) {
            console.log(error)
        } else {
            console.log(user.displayImage)
            oldlink = user.displayImage.split('/')[5];
            console.log(oldlink)
        }
    }



    setTimeout(() => {
        const path = "./images/products/" + oldlink;
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




        console.log("product Iamge Name " + req.file.filename);
        const imagePath = 'http://localhost:3000/images/products/' + req.file.filename;
        console.log(imagePath)


        if (req.file) {
            console.log("Image Found");
            console.log(req.params.postid)
            Product.findByIdAndUpdate(req.params.postid,
                {
                    $set: {
                        displayImage: imagePath
                    }
                },
                {
                    new: true
                },
                function (err, Postdata) {
                    if (err) {
                        res.send("Error update displayImage field");
                    } else {
                        res.json(Postdata);
                        console.log("product image upload successfully");

                    }
                }

            );

        }
    }, 200)

})

router.post('/addnewPharmacist', async (req, res)=>{
    const salt = await bcrypt.genSalt(5)
    const x= await bcrypt.hash(req.body.password, salt);
    data={
        email:req.body.email,
        name:req.body.name,
        password:x
    }

    var pharmacist = new Pharmacist(data);

    pharmacist.save((error, result)=>{
        if(!error){
            res.send(result);
        }
    })
})




//Upload Pescription
const prescriptionImageUpload= require('../healper/storagePrescription');
const Notification = require('../Models/Notification');
const Drug = require('../Models/Drug');
router.post('/prescription/:postid/uploadPhoto', prescriptionImageUpload.uploadImage().single('prescriptionImage'), async (req, res, next) => {

    console.log("prescription Iamge Name" + req.file.filename);
    let imagePath = 'http://localhost:3000/images/prescription/' + req.file.filename;


    if (req.file) {
        console.log("Image Found");
        console.log(req.params.postid)
        Prescription.findByIdAndUpdate(req.params.postid,
            {
                $set: {
                    displayImage: imagePath
                }
            },
            {
                new: true
            },
            function (err, Postdata) {
                if (err) {
                    res.send("Error update displayImage field");
                } else {
                    res.json(Postdata);
                    console.log("prescription profile image upload successfully");

                }
            }

        );

    }
});

//get all prescription

router.get('/get-all-prescription', function(req, res){
    Prescription.find({}, (error, result)=>{
        if(!error){
            res.send(result);
        }
    })
});

//get single presccription
router.get('/getsingleprescription/:id', function(req, res){
    Prescription.findOne({_id:req.params.id}, (error, result)=>{
        if(!error){
            res.send(result);
        }
    })
});

//getallpatientprescriptions
router.get('/allpatientprescriptions/:patientid', function(req,res){
    Prescription.find({patientid:req.params.patientid}, function(error,result){
        if(!error){
            res.send(result)
        }
    })
})

//delete prescription

router.delete('/deletePrescription/:id', function(req,res){
    Prescription.deleteOne({_id:req.params.id}, function(err,result){
        if(!err){
            res.send(result)
        }
    })
})

//Notification
router.post('/sendNotification', (req, res)=>{
    var data={
        patientid:req.body.patientid,
        doctorid:req.body.doctorid,
        time:req.body.time,
        content:req.body.content,
        header:req.body.header,
        seen:req.body.seen
    }

    var notification= new Notification(data);
    notification.save((error, result)=>{
        if(!error){
            res.send(result);
        }
    })
})

router.get('/getAllNotification', (req, res)=>{
    Notification.find({}, (error, result)=>{
        if(!error){
            res.send(result);
        }
    })
})
router.get('/getSpecificAppoinment/:id', (req, res)=>{
    Notification.find({doctorid:req.params.id}, (error, result)=>{
        if(!error){
            res.send(result)
        }
    })
})
router.get('/seen/:id', (req, res)=>{
    Notification.findByIdAndUpdate(req.params.id, {seen:true}, function(error, docs){
        if(!error){
            res.send("seen");
        }
    })
})

//drugs
router.get("/allDrugs", (req,res)=>{
    Drug.find({}, (error,result)=>{
        if(!error){
            res.send(result);
        }
    })
})

//get single drug
router.get('/getSingleDrug/:id', function(req, res){
    Drug.findOne({_id:req.params.id}, (error, result)=>{
        if(!error){
            res.send(result);
        }
    })
});

//update drug

router.put('/updateDrug/:id', function (req, res) {
    Drug.findByIdAndUpdate(req.params.id,
        {
            $set: {
                    drugname: req.body.drugname,
                    price: req.body.price,
                    description: req.body.description
                    
            }
        }, {
        new: true
    }, function (error, result) {
        if (error) {
            res.send("Error updating");
        } else {
            res.send(result);
        }
    }
    );


});

//add new drug
router.post('/addNewDrug', (req, res)=>{
    data={
        id : req.body.id,
       drugname: req.body.drugname,
       price : req.body.price,
       description : req.body.description,
    }

    var drug = new Drug(data);

    drug.save((error, result)=>{
        if(!error){
            res.send(result);
        }
    })
})

router.get('/getAllmedicineofPatient/:id', (req,res)=>{
    Prescription.find({patientid:req.params.id}, "medicine adminSign _id", (error,result)=>{
        if(!error){
            res.send(result)
        }
    } )
})

router.get('/getAllPhamasist', (req,res)=>{
    Pharmacist.find({},(error, result)=>{
        if(!error){
            res.send(result);
        }
    })
})
router.get('/deletePhamasist/:id', (req,res)=>{
    Pharmacist.deleteOne({_id:req.params.id}, function(err,result){
        if(!err){
            console.log("Deleted");
            res.send(result);

        }
    })
});



//password reset part
const passwordResetToken = require('../Models/ResetToken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const ResetToken = require('../Models/ResetToken');
router.post('/req-reset-password-patient', async function(req,res){
    if (!req.body.email) {
        return res.status(500).json({ message: 'Email is required' });
        }
        const user = await Patient.findOne({
        email:req.body.email
        });
        if (!user) {
            console.log("sdfsd")
        return res.status(409).json({ message: 'Email does not exist' });
        }
        var mytoken=crypto.randomBytes(16).toString('hex');
        ResetToken.findOne({email:req.body.email}, function(error, result){
            if(result==null){
                var data={
                    email:req.body.email,
                    token:'notoken'
                }
                var token=new ResetToken(data);
                token.save();
            }
        })
        
        
        setTimeout(()=>{
            ResetToken.findOneAndUpdate({email:req.body.email},
                {
                    $set: {
                            token:mytoken
                            
                    }
                }, {
                new: true
            }, function (error, result) {
                if (error) {
                    res.send("Error updating");
                } else {
                    res.send(result);
                }
            }
            );
            
            const transporter = nodemailer.createTransport({
                host: 'smtp.office365.com',
                port: 587,
                secure:false,
                auth: {
                    user: 'deshanharshana@outlook.com',
                    pass: 'Harshana5566',
                }
            });
            var mailOptions = {
            to: user.email,
            from: 'deshanharshana@outlook.com',
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://localhost:4200/response-reset-password-patient/'+mytoken+'\n\n'+
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }
            transporter.sendMail(mailOptions, (err, info) => {
                console.log(err)
            })
        },2000)
        
        });


router.post('/req-reset-password', async function(req,res){
    if (!req.body.email) {
        return res.status(500).json({ message: 'Email is required' });
        }
        const user = await Doctor.findOne({
        email:req.body.email
        });
        if (!user) {
            console.log("sdfsd")
        return res.status(409).json({ message: 'Email does not exist' });
        }
        var mytoken=crypto.randomBytes(16).toString('hex');
        ResetToken.findOne({email:req.body.email}, function(error, result){
            if(result==null){
                var data={
                    email:req.body.email,
                    token:'notoken'
                }
                var token=new ResetToken(data);
                token.save();
            }
        })
        
        
        setTimeout(()=>{
            ResetToken.findOneAndUpdate({email:req.body.email},
                {
                    $set: {
                            token:mytoken
                            
                    }
                }, {
                new: true
            }, function (error, result) {
                if (error) {
                    res.send("Error updating");
                } else {
                    res.send(result);
                }
            }
            );
            
            const transporter = nodemailer.createTransport({
                host: 'smtp.office365.com',
                port: 587,
                secure:false,
                auth: {
                    user: 'deshanharshana@outlook.com',
                    pass: 'Harshana5566',
                }
            });
            var mailOptions = {
            to: user.email,
            from: 'deshanharshana@outlook.com',
            subject: 'Node.js Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://localhost:4200/response-reset-password/'+mytoken+'\n\n'+
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }
            transporter.sendMail(mailOptions, (err, info) => {
                console.log(err)
            })
        },2000)
        
        });


router.get('/getDoctorIDfromEmail/:email', function(req,res){
    Doctor.findOne({email:req.params.email}, '_id', function(error,result){
        if(!error){
            res.send(result);
        }
        
    })
});



router.post('/valid-password-token',async function(req,res){
    if (!req.body.token) {
        return res.json({ message: 'Token is required' });
        }
        const user = await passwordResetToken.findOne({
        token: req.body.token
        });
        if (!user) {
        return res.json({ message: 'invalid' });
        }else{
            return res.json({message:"valid"})
        }
        
    })
       
    router.post('/valid-password-token-patient',async function(req,res){
        if (!req.body.token) {
            return res.json({ message: 'Token is required' });
            }
            const user = await passwordResetToken.findOne({
            token: req.body.token
            });
            if (!user) {
            return res.json({ message: 'invalid' });
            }else{
                return res.json({message:"valid"})
            }
            
        })
//restrict patient
router.put('/restrictReport/:id', function(req,res){
    Patient.findByIdAndUpdate(req.params.id,
        {
            $set: {
                subscription:req.body.subscription
            }
        }, {
        new: true
    }, function (error, result) {
        if (error) {
            res.send("Error updating");
        } else {
            res.send(result);
        }
    }
    );
})

//export model
module.exports = router;