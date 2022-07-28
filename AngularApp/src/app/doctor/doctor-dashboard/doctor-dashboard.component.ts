import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

currentDoctor:string=""
cancel:boolean=false;
Doctor_count=0;
Patient_count=0;
time:any;
hours:any;
msg:any;
link:any;
displayImage="";
doctordata:any=[];
Appoinment_count=0;
today = new Date().toISOString().slice(0, 10);
notification_count:number=0;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private doctor:DoctorService,
    public toastr:ToastrService,
    private notification:NotificationService

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
    this.currentDoctor=String(localStorage.getItem('doctorid') || '');
    setTimeout(() => {
      this.doctor.getoneDoctor(this.currentDoctor).subscribe(res=>{
        this.doctordata=res;
        this.displayImage=this.doctordata.displayImage;
      });
    });
      this.notification.getSpecificNotofication(this.currentDoctor).subscribe((res)=>{
        console.log("Notification", Object.keys(res).length)
        this.notification_count=Object.keys(res).filter(k=>res[k].seen==false).length
      });
      this.doctor.getAllDoctors().subscribe(res=>{
        this.doctordata=res;
      });
      this.doctor.dashboardData().subscribe(res=>{
        this.Doctor_count=res.doctor;
        this.Appoinment_count=res.appoinment;
        this.Patient_count=res.patient;
      })
   

  }

  profile(){
    this.router.navigate(['show-doctor-details/'+localStorage.getItem('doctorid')])
  }
  patient(){
    this.router.navigate(['DoctorPatientList/'+localStorage.getItem('doctorid')])
  }


  logout(){

    this.auth.logout();
      }

      available(value:any){
        console.log(value.target.checked)
        var data={
          available:value.target.checked
        }
        this.doctor.changeAvalilability(this.currentDoctor, data).subscribe(res=>{
            if(res.available==true){
              this.toast("Doctor is Available Now");
            }else{
              this.toast("Doctor is Not Available")
            }
        })

      }
      toast(message:String) {
        this.toastr.warning(message.toString(), "Change Availability");
       }
}
