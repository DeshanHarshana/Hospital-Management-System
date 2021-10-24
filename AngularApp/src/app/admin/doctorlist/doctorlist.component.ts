import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {
  admindata:any=[]
  data:any=[];
  constructor(
    private doctorService:DoctorService,
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private admin:AdminService,
    public toastr:ToastrService
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.admin.getAdmin().subscribe(res=>{
        this.admindata=res;
      });
      this.doctorService.getAllDoctors().subscribe(
        res=>{
          this.data=res;
        }
      )
  });
  }
  testroute(){

this.router.navigate(['Admin-edit-doctor-details'])
  }

  logout(){

    this.auth.logout();
      }
      available(available:boolean, id:string){
        if(available){
          var data={
            available:false
          }
          this.doctorService.changeAvalilability(id, data).subscribe(res=>{
            this.toast("");
            this.ngOnInit();
          })
        }else{
          var data={
            available:true
          }
          this.doctorService.changeAvalilability(id, data).subscribe(res=>{
            this.toast("")
            this.ngOnInit();
          })
        }
      }
      toast(message:String) {
        this.toastr.warning(message.toString(), "Change Availability");
       }
}
