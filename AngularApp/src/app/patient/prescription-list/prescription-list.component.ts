import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientService } from 'src/app/services/patient.service';
import { PrescriptionService } from 'src/app/services/prescription.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
  prescriptionData:any=[];
  patientid:string="";
  patientname:string="";
  displayImage:string="";
  patient_id : string = '';
  constructor(
    private auth:AuthenticationService,
    private prescription:PrescriptionService,
    private patient:PatientService
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
    this.patientid=localStorage.getItem('patientid') || "";
    setTimeout(()=>{
      this.prescription.getAllPatientPrescriptions(this.patientid).subscribe(res=>{
        this.prescriptionData=res;
      })
    });
    this.patient.getonePatient(this.patientid).subscribe(res=>{
      this.patientname=res.name;
      this.displayImage=res.displayImage;
    })
  }
  logout(){

    this.auth.logout();
      }
}
