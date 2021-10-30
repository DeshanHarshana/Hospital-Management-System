import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WardService } from 'src/app/services/ward.service';
import {FormControl, FormGroup} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-edit-ward-details',
  templateUrl: './edit-ward-details.component.html',
  styleUrls: ['./edit-ward-details.component.css']
})
export class EditWardDetailsComponent implements OnInit {
  assignDoctorfield:boolean=false;
  doctorlist:any=[];
  ward=new FormGroup({
    wardid:new FormControl(''),
    wardno:new FormControl(''),
    departmentid:new FormControl(''),
    departmentname:new FormControl(''),
    noofbeds:new FormControl(''),
    noofpatients:new FormControl(''),
    doctor:new FormControl('')
  })

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private wardservice:WardService,
    public toastr:ToastrService,
    public doctorService:DoctorService
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id);
    setTimeout(() => {
      this.wardservice.getWarddetails(this.route.snapshot.params.id).subscribe(res =>{
        console.log(res);
        this.ward.get('wardid')?.setValue(res.wardid);
        this.ward.get('wardno')?.setValue(res.wardno);
        this.ward.get('departmentid')?.setValue(res.departmentid);
        this.ward.get('departmentname')?.setValue(res.departmentname);
        this.ward.get('noofbeds')?.setValue(res.noofbeds);
        this.ward.get('noofpatients')?.setValue(res.noofpatients);
        this.ward.get('doctor')?.setValue(res.doctor);




      })
    },10)
  }

  logout(){

    this.auth.logout();
  }

  /*update(data:any){
    this.ward.updatewarddetails(this.route.snapshot.params.id,data).subscribe(res=>{
      console.log("Successfully Updated");
    })
  }*/

  update(ward:any){

    this.wardservice.updatewarddetails(ward,this.route.snapshot.params.id).subscribe(res=>{
      this.toastr.success("Update Successfully", "Updating Ward details");
      setTimeout(()=>{
        this.router.navigate(['Admin-dashboard']);
      });
    })
  }
  assign(){
    setTimeout(() => {
      this.doctorService.getAllDoctors().subscribe(res=>{
        this.doctorlist=res;
        this.assignDoctorfield=true;
        console.log(this.doctorlist)
      })
    },);

  }
}
