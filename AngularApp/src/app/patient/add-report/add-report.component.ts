import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Methods } from 'src/app/appdata/methods';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { ReportsService } from 'src/app/services/reports.service';



@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'],
  providers:[Methods]
})
export class AddReportComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
  displayImage="";
  doctordata:any=[];
  report = new FormGroup({
    name:new FormControl(''),
    age:new FormControl(''),
    guardian: new FormControl(''),
    gender: new FormControl(''),
    relationship:new FormControl(''),
    taddress: new FormControl(''),
    paddress: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    occupation: new FormControl(''),
    weight: new FormControl(''),
    height: new FormControl(''),
    heartDisease:new FormControl(false),
    diabetes:new FormControl(false),
    hbp: new FormControl(false),
    canser:new FormControl(false),
    hc:new FormControl(false),
    kidney:new FormControl(false),
    stroke:new FormControl(false),
    dep:new FormControl(false),
    surgeries:new FormControl(''),
    medications:new FormControl(''),
    latex:new FormControl(false),
    iodine:new FormControl(false),
    bromine:new FormControl(false),
    description:new FormControl(''),
    date:new FormControl(new Date()),
    sign:new FormControl(''),
  doctorid:new FormControl(''),
    patientid:new FormControl(''),
    doctorname:new FormControl(''),
    nic:new FormControl(''),



  });
  currentPatient:string="";
  currentDoctor:string="";
  doctorName:string="";
  constructor(
    private auth:AuthenticationService,
    private reportS:ReportsService,
    private methods:Methods,
    private route:ActivatedRoute,
    private patient:PatientService,
    private doctor:DoctorService,
    public toastr:ToastrService,
    private router:Router
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
    this.currentPatient=this.route.snapshot.params.id;
    this.currentDoctor=String(localStorage.getItem('doctorid') || '');

    setTimeout(() => {
      this.doctor.getoneDoctor(this.currentDoctor).subscribe(res=>{
        this.doctordata=res;
        this.displayImage=res.displayImage;
        this.doctorName=res.fullname;
      })
    }, 2);

  }

  logout(){

    this.auth.logout();
      }

  addReport(report:any){
    report.date=this.methods.convert(report.date);
    report.doctorid=this.currentDoctor;
    report.patientid=this.currentPatient;
    report.doctorname=this.doctorName;


     this.reportS.addReport(report).subscribe(res=>{
       var data={
          reportid:res.id
       }
       this.patient.addreportlist(data,this.currentPatient).subscribe(res=>{
            console.log(res);
            this.toast("Report Added Successfull");
            this.router.navigate(['report-list/'+this.currentPatient]);
       })
     })
    }
    toast(message:String) {
      this.toastr.warning(message.toString(), "Adding Report");
     }

     profile(){
      this.router.navigate(['show-doctor-details/'+localStorage.getItem('doctorid')])
    }
    patientload(){
      this.router.navigate(['DoctorPatientList/'+localStorage.getItem('doctorid')])
    }
  
}
