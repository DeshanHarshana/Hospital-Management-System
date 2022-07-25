import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientService } from 'src/app/services/patient.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reportlist',
  templateUrl: './reportlist.component.html',
  styleUrls: ['./reportlist.component.css']
})
export class ReportlistComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
  data:any=[];
  currentPatient:string="";
  role : string = '';
  canAccess : boolean = false; 
  image:string="";
  name:string=""
  restrict:boolean=false;
  canChange:boolean=false;
  constructor(
    private auth:AuthenticationService,
    private route:ActivatedRoute,
    private report:ReportsService,
    private patient:PatientService,
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
    this.currentPatient=this.route.snapshot.params.id;
    this.role = localStorage.getItem('access') || '';
    setTimeout(() => {
      this.report.getPatientReports(this.currentPatient).subscribe(res=>{
        this.data=res;
        
      });
      this.patient.getonePatient(this.currentPatient).subscribe(res=>{
        this.restrict=res.subscription;
        //console.log(res)
      })
      this.patient.getonePatient(this.currentPatient).subscribe(res=>{
        this.name=res.name;
        console.log(name)
      });
      this.patient.getonePatient(this.currentPatient).subscribe((res)=>{
        this.image=res.displayImage;
      })
    }, 20);

    if(this.role == 'doctor'){
      this.canAccess = true;
    }
    else{
      this.canAccess = false;
    }

    if(this.role=="patient"){
      this.canChange=true;
    }else{
      this.canChange=false;
    }

  }
  available(value:any){
    console.log(value.target.checked)
    var data={
      subscription:value.target.checked
    }
    this.patient.restriction(this.currentPatient,data).subscribe(res=>{
      this.toast("Changed")
    })
    

  }
  toast(message:String) {
    this.toastr.warning(message.toString(), "Change Restriction");
   }
  goHome(){
    const access=localStorage.getItem('access')
    console.log(access);
    if(access=="admin"){
      this.router.navigate(['Admin-dashboard'])
    }else if(access=='doctor'){
      this.router.navigate(['Doctor-dashboard'])
    }else if(access=='patient'){
      this.router.navigate(['Patient-dashboard'])
    }else{
      this.router.navigate(['/']);
    }
  }
  logout(){

    this.auth.logout();
      }
}
