import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-checked-appointments',
  templateUrl: './checked-appointments.component.html',
  styleUrls: ['./checked-appointments.component.css']
})
export class CheckedAppointmentsComponent implements OnInit {
  data:any=[]
  displayImage="";
  doctordata:any=[];
  time:any;
  hours:any;
  msg:any;
  link:any;
  currentPatient: any;
  currentDoctor="";
  today = new Date().toISOString().slice(0, 10);
  constructor(
    private router: Router,
    private auth: AuthenticationService,

    private notification:NotificationService,
    private route:ActivatedRoute,
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

    setTimeout(() => {
      this.currentDoctor=String(localStorage.getItem('doctorid') || '');

      this.doctorService.getoneDoctor(this.currentDoctor).subscribe(res=>{
        this.doctordata=res;
        this.displayImage=this.doctordata.displayImage;
      })
      this.notification.getSpecificNotofication(this.route.snapshot.params.id).subscribe((res)=>{
        this.data=res


      })
  })}
  logout() {
    this.auth.logout();
  }

  content(id:string){
    this.notification.seen(id).subscribe((res)=>{});
    this.router.navigate(['DoctorAppoinmentList'])
  }
  profile(){
    this.router.navigate(['show-doctor-details/'+localStorage.getItem('doctorid')])
  }
  patientload(){
    this.router.navigate(['DoctorPatientList/'+localStorage.getItem('doctorid')])
  }
}
