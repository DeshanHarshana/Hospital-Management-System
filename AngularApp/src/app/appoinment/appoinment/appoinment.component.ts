import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Methods } from 'src/app/appdata/methods';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-appoinment',
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.css'],
  providers:[Methods]
})
export class AppoinmentComponent implements OnInit {
  appoinment = new FormGroup({
    firstname:new FormControl(''),
    lastname:new FormControl(''),
    gender:new FormControl(''),
    dob:new FormControl(new Date()),
    nic:new FormControl(''),
    number:new FormControl(''),
    address:new FormControl(''),
    service:new FormControl(''),
    appoinmentDate:new FormControl(new Date()),
    appoinmentTime:new FormControl(''),
    doctorname:new FormControl(''),
    emargancy:new FormControl(''),
    doctorid: new FormControl(''),
    status: new FormControl(''),
    patientid:new FormControl(''),
    displayImage:new FormControl('')
  });

  currentPatient="";
  choosenDoctor="";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private method:Methods,
    private patient:PatientService,
    private doctor:DoctorService,
    private apt:AppoinmentService
  ) {}

  ngOnInit(): void {
    this.currentPatient=String(localStorage.getItem('patientid') || '');
    this.choosenDoctor=this.route.snapshot.params.id;
    setTimeout(() => {

      this.patient.getonePatient(this.currentPatient).subscribe(res=>{
        this.appoinment.get('firstname')?.setValue(res.name);
        this.appoinment.get('gender')?.setValue(res.gender);
        this.appoinment.get('nic')?.setValue(res.nic);
        this.appoinment.get('number')?.setValue(res.phone);
      });

      this.doctor.getoneDoctor(this.choosenDoctor).subscribe(res=>{
        this.appoinment.get('doctorname')?.setValue(res.fullname);
        this.appoinment.get('doctorid')?.setValue(res._id)
        this.appoinment.get('patientid')?.setValue(this.currentPatient);
        this.appoinment.get('displayImage')?.setValue(res.displayImage)
      })
    });
  }

  logout() {
    this.auth.logout();
  }
  make(appoinment: any) {
    appoinment.dob=this.method.convert(appoinment.dob);
    appoinment.status="Pending";
    appoinment.appoinmentDate=this.method.convert(appoinment.appoinmentDate);
   this.apt.putAppoinment(appoinment).subscribe(res=>{
     let appoinmentdata={
      appointmentid:res.id
     }
     this.doctor.putAppoinment(appoinmentdata, this.choosenDoctor).subscribe(res=>{
       console.log(res);
       this.router.navigate(['Patient-dashboard']);
     })
   })
  }
}
