import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/appdata/Doctor';
import { PatientService } from 'src/app/services/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appoinment-doctor-list',
  templateUrl: './appoinment-doctor-list.component.html',
  styleUrls: ['./appoinment-doctor-list.component.css']
})
export class AppoinmentDoctorListComponent implements OnInit {

  p:number=1;
  tempdata:Doctor[]=[]
  filterdData:any=[];
  name:any;
  catogory:any="All Doctors";
  constructor(
    private doctorService:DoctorService,
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private patient:PatientService,
    public toastr:ToastrService
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.doctorService.getAllDoctorAppoinment().subscribe(res=>{
        this.tempdata=res;
        this.filterdData=this.tempdata;
        this.catogory=="All Doctors";
      });


    }, );
  }


  logout(){

    this.auth.logout();
      }
      Search(){
        if(this.name==""){
          this.filterdData=this.tempdata;
        }else{
          this.filterdData=this.tempdata.filter(res=>{
            return res.fullname.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
          })
        }
      }
      Catogorize(){
        if(this.catogory=="All Doctors"){
          this.filterdData=this.tempdata;
        }else{
          this.filterdData=this.tempdata.filter(res=>{
            return res.type.toLocaleLowerCase().match(this.catogory.toLocaleLowerCase())
          })
        }
      }

}
