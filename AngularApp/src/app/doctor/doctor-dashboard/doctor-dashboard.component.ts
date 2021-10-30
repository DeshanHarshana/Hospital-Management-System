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
doctordata:any=[];
currentDoctor:string=""
notification_count:number=0;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private doctor:DoctorService,
    public toastr:ToastrService,
    private notification:NotificationService

  ) { }

  ngOnInit(): void {
    this.currentDoctor=String(localStorage.getItem('doctorid') || '');
    setTimeout(() => {
      this.doctor.getoneDoctor(this.currentDoctor).subscribe(res=>{
        this.doctordata=res;
      });
      this.notification.getSpecificNotofication(this.currentDoctor).subscribe((res)=>{
        console.log("Notification", Object.keys(res).length)
        this.notification_count=Object.keys(res).filter(k=>res[k].seen==false).length
      })
    });

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
