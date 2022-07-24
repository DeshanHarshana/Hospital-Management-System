import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appoinment } from 'src/app/appdata/Appoinment';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-appoinmentlist',
  templateUrl: './appoinmentlist.component.html',
  styleUrls: ['./appoinmentlist.component.css'],
})
export class AppoinmentlistComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
  tempdata: Appoinment[] = [];
  p: number = 1;
  filterdData: any = [];
  currentPatient: any;
  patientname:string="";
  displayImage:string="";
  patient_id : string = '';
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private patient: PatientService,
    private apt: AppoinmentService
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
    this.currentPatient = String(localStorage.getItem('patientid') || '');
    setTimeout(() => {
      this.apt
        .getPatienthisAppoinments(this.currentPatient)
        .subscribe((res) => {
          this.tempdata = res;
          this.filterdData = this.tempdata;
        });
    });
    this.patient_id = localStorage.getItem('patientid') || '';
    console.log(this.patient_id);

    this.patient.getonePatient(this.patient_id).subscribe(res=>{
      this.patientname=res.name;
      this.displayImage=res.displayImage;
    })


  }
  logout() {
    this.auth.logout();
  }
  deleteAppoinment(appointmnetid:string, doctorid:string){
    let appoinmentdata={
      appointmentid:appointmnetid
    }
this.apt.deleteAppoinmentinDoctorlist(doctorid,appoinmentdata).subscribe(res=>{
  this.apt.deleteAppoinment(appointmnetid).subscribe(res2=>{
    console.log(res2);
    this.router.navigate(['Patient-dashboard']);
  })
})
  }
}
