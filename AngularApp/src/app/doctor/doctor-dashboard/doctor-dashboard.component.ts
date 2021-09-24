import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
doctordata:any=[];
currentDoctor:string=""
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private doctor:DoctorService,
    public toastr:ToastrService,

  ) { }

  ngOnInit(): void {
    this.currentDoctor=String(localStorage.getItem('doctorid') || '');
    setTimeout(() => {
      this.doctor.getoneDoctor(this.currentDoctor).subscribe(res=>{
        this.doctordata=res;
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
