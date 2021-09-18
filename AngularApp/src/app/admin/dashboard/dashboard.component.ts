import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  main:boolean=true;
  admindata:any=[]
  Doctor_count=0;
  Patient_count=0;
  Appoinment_count=0;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private admin:AdminService
  ) {
     }

     logout(){

      this.auth.logout();
        }
  ngOnInit(): void {

this.admin.getAdmin().subscribe(res=>{
  this.admindata=res;
});
this.admin.dashboardData().subscribe(res=>{
  this.Doctor_count=res.doctor;
  this.Appoinment_count=res.appoinment;
  this.Patient_count=res.patient;
})

  }
}
