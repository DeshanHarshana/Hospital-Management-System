import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PatientService } from 'src/app/services/patient.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-patient-show-profile',
  templateUrl: './patient-show-profile.component.html',
  styleUrls: ['./patient-show-profile.component.css']
})
export class PatientShowProfileComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
  bloodsuger="../../../assets/patient/blood-drop.svg"
  bloodpresure="../../../assets/patient/hypertension.svg";
  cholestrol="../../../assets/patient/blood-test.svg";
  //medical details
  cholestrolLevel:number=0;
  sugerLevel:number=0;
  presureLevel:number=0;
  rcholestrolLevel:number=0;
  rsugerLevel:number=0;
  rpresureLevel:number=0;
  access=false;
  patientData:any=[]
  restriction:boolean=false;
  routePath="";
  constructor(
    private router:Router,
    private auth:AuthenticationService,
    private route:ActivatedRoute,
    private patient:PatientService,
    public toastr:ToastrService
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

    const id=this.route.snapshot.params.id;
    this.access=localStorage.getItem('access')=="admin";
    if(localStorage.getItem('access')=="patient"){
      this.routePath="Patient-dashboard";
    }
    else if(this.access){
      this.routePath="Admin-dashboard";
    }

    console.log(id)
    setTimeout(() => {
      this.patient.getonePatient(id).subscribe(res=>{
        console.log(res)

        this.patientData=res;
        this.cholestrolLevel=res.cholestrol;
        this.restriction=res.subscription;
        this.sugerLevel=res.bloodsuger;
        this.presureLevel=res.bloodpresure;
        this.rcholestrolLevel=Math.round((res.cholestrol * 100)/110);
        this.rsugerLevel=Math.round((res.bloodsuger*100)/200);
        this.rpresureLevel=Math.round((res.bloodpresure*100)/200);
      })
    },100);



  }
  addPrescription(){
    const access=localStorage.getItem('access')
    if(access=="doctor"){
      return false;
    }
    return true;
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
      toast(message:String) {
        this.toastr.warning(message.toString(), "warning");
       }
      restrict(id:any){
        if(this.restriction){
          this.toast("This reports are restricted");
        }else{
          this.router.navigate(['report-list/'+id])
        }
        //console.log(id);
      }

}
