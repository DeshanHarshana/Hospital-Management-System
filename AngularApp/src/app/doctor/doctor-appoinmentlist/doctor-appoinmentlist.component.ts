import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appoinment } from 'src/app/appdata/Appoinment';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-doctor-appoinmentlist',
  templateUrl: './doctor-appoinmentlist.component.html',
  styleUrls: ['./doctor-appoinmentlist.component.css'],
})
export class DoctorAppoinmentlistComponent implements OnInit {
  tempdata: Appoinment[] = [];
  p: number = 1;
  filterdData: any = [];
  currentDoctor: any;
  time:any;
  hours:any;
  msg:any;
  link:any;
  displayImage="";
  today = new Date().toISOString().slice(0, 10);
doctordata:any=[];
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private patient: PatientService,
    private apt: AppoinmentService,
    private doctor:DoctorService,
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

      this.currentDoctor=String(localStorage.getItem('doctorid') || '');

      this.doctor.getoneDoctor(this.currentDoctor).subscribe(res=>{
        this.doctordata=res;
        this.displayImage=this.doctordata.displayImage;

      this.apt
        .getPatienthisAppoinmentsDoctor(this.currentDoctor)
        .subscribe((res) => {
          this.tempdata = res;
          this.filterdData = this.tempdata;
        });
    });
  }
  logout() {
    this.auth.logout();
  }profile(){
    this.router.navigate(['show-doctor-details/'+localStorage.getItem('doctorid')])
  }
  patientload(){
    this.router.navigate(['DoctorPatientList/'+localStorage.getItem('doctorid')])
  }

  deleteAppoinment(appointmnetid: string, doctorid: string) {
    let appoinmentdata = {
      appointmentid: appointmnetid,
    };
    this.apt
      .deleteAppoinmentinDoctorlist(doctorid, appoinmentdata)
      .subscribe((res) => {
        this.apt.deleteAppoinment(appointmnetid).subscribe((res2) => {
          console.log(res2);
          this.ngOnInit();
        });
      });
  }

  accept(value:string, appoinmentid:string){
let doctorData={
  doctorid:this.currentDoctor
}
this.patient.addDoctortoList(doctorData, value).subscribe(res=>{
  let patiendata={
    patientid:value
  }
  this.doctorService.acceptAppoinment(patiendata, this.currentDoctor).subscribe(res=>{
    this.apt.changeAppoinmentState(appoinmentid).subscribe(res=>{
      this.ngOnInit();
    })
  })
});
  }
}
