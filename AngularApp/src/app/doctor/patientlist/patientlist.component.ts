import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appoinment } from 'src/app/appdata/Appoinment';
import { Patient } from 'src/app/appdata/Patient';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {

  p: number = 1;
  filterdData: any = [];
  currentDoctor: any;
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
  displayImage="";
  doctordata:any=[];
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private patient: PatientService,
    private apt: AppoinmentService,
    private doctorService:DoctorService
  ) {
    setInterval(() => {
      this.time = new Date();
   }, 1000);
   this.decide();
  }
  decide() {
    this.hours = new Date().getHours();
    console.log("this.hours",this.hours)
    if(this.hours < 10){
      this.msg = "Good Morning"
      this.link = "wwww.google.com"
      console.log("selamat Pagi")
    }else if(this.hours < 16){
      this.msg = "Good Afternoon"
      this.link = "wwww.tokopedia.com"
      console.log("selamat siang")
    }else if(this.hours < 19){
      this.msg = "Good Evening"
    }else if(this.hours < 24){
      this.msg = "Good Night"
      this.link = "wwww.sprout.co.id"
      console.log("selamat malam")
    }else if(this.hours < 6){
      this.msg = "Sleep lah"
      this.link = "www.mangabat.com"
      console.log("selamat subuh")
    }
  }


  ngOnInit(): void {
    this.currentDoctor = String(localStorage.getItem('doctorid') || '');
    setTimeout(() => {
      this.currentDoctor=String(localStorage.getItem('doctorid') || '');

      this.doctorService.getoneDoctor(this.currentDoctor).subscribe(res=>{
        this.doctordata=res;
        this.displayImage=this.doctordata.displayImage;
      })
      this.doctorService.getPatientList(this.currentDoctor).subscribe(res=>{
        this.filterdData=res;
        console.log(this.filterdData)
      })
    });
  }
  logout() {
    this.auth.logout();
  }
  profile(){
    this.router.navigate(['show-doctor-details/'+localStorage.getItem('doctorid')])
  }
  

}
