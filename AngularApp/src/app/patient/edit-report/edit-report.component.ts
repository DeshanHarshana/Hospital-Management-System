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
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css'],
  providers:[Methods]
})
export class EditReportComponent implements OnInit {
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
    nic:new FormControl(''),
    doctorid:new FormControl(''),
    patientid:new FormControl(''),
    doctorname:new FormControl('')

});

  currentPatient:string="";
  currentDoctor:string="";
  doctorName:string="";
  currentReport:string="";
  constructor(
    private auth:AuthenticationService,
    private reportS:ReportsService,
    private methods:Methods,
    private route:ActivatedRoute,
    private patient:PatientService,
    private doctor:DoctorService,
    private router:Router,
    public toastr:ToastrService,
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
    this.currentReport=this.route.snapshot.params.id;
    setTimeout(() => {
      this.reportS.getSingleReport(this.currentReport).subscribe(res=>{
        this.doctorName=res.doctorname;
        this.currentPatient=res.patientid;
        this.currentDoctor=res.doctorid;


        this.report.get('name')?.setValue(res.name);
        this.report.get('age')?.setValue(res.age);
        this.report.get('guardian')?.setValue(res.guardian);
        this.report.get('gender')?.setValue(res.gender);
        this.report.get('relationship')?.setValue(res.relationship);
        this.report.get('taddress')?.setValue(res.taddress);
        this.report.get('paddress')?.setValue(res.paddress);
        this.report.get('phone')?.setValue(res.phone);
        this.report.get('email')?.setValue(res.email);
        this.report.get('occupation')?.setValue(res.occupation);
        this.report.get('weight')?.setValue(res.weight);
        this.report.get('height')?.setValue(res.height);
        this.report.get('heartDisease')?.setValue(res.heartDisease);
        this.report.get('diabetes')?.setValue(res.diabetes);
        this.report.get('hbp')?.setValue(res.hbp);
        this.report.get('canser')?.setValue(res.canser);
        this.report.get('hc')?.setValue(res.hc);
        this.report.get('kidney')?.setValue(res.kidney);
        this.report.get('stroke')?.setValue(res.stroke);
        this.report.get('dep')?.setValue(res.dep);
        this.report.get('surgeries')?.setValue(res.surgeries);
        this.report.get('medications')?.setValue(res.medications);
        this.report.get('latex')?.setValue(res.latex);
        this.report.get('iodine')?.setValue(res.iodine);
        this.report.get('bromine')?.setValue(res.bromine);
        this.report.get('description')?.setValue(res.description);
        this.report.get('sign')?.setValue(res.sign);
        this.report.get('nic')?.setValue(res.nic);


      })

    }, 2);
    this.doctor.getoneDoctor(localStorage.getItem('doctorid')||"").subscribe(res=>{
      this.doctordata=res;
      this.displayImage=res.displayImage;
      
    })

  }

  logout(){

    this.auth.logout();
      }

      updateReport(report:any){
    report.date=this.methods.convert(report.date);
    report.doctorid=this.currentDoctor;
    report.patientid=this.currentPatient;
    report.doctorname=this.doctorName;

        this.reportS.updateReport(report, this.currentReport).subscribe(res=>{
          console.log(res);
          this.router.navigate(['show-report/'+ res._id]);
          this.toast("Updating Report Successfull")
        })
      }
      toast(message:String) {
        this.toastr.warning(message.toString(), "Updating Report");
       }
       toast2(message:String) {
        this.toastr.success(message.toString(), "Delete Report");
       }
       deleteReport(){
         let data={
            reportid:this.currentReport
         }
         this.reportS.deleteFromPatientList(data, this.currentPatient).subscribe(res=>{
           this.reportS.deleteReport(this.currentReport).subscribe(res=>{
             this.toast2("Deleting Successfull");
             this.router.navigate(['report-list/'+this.currentPatient]);
           })
         })
       }
       profile(){
        this.router.navigate(['show-doctor-details/'+localStorage.getItem('doctorid')])
      }
      patientload(){
        this.router.navigate(['DoctorPatientList/'+localStorage.getItem('doctorid')])
      }
}
