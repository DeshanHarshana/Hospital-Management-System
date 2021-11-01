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
  doctoridlist:string[]=[];
  tempdata:Doctor[]=[]
  temp2data:Doctor[]=[];
  mydoctors:Doctor[]=[]
  filterdData:any=[];
  name:any;
  patient_id:string=''
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
    this.patient_id=this.route.snapshot.params.id;
    setTimeout(() => {
      this.doctorService.getAllDoctorAppoinment().subscribe(res=>{
        this.tempdata=res;
        this.filterdData=this.tempdata;
        this.catogory=="All Doctors";
      });
      this.patient.getAlldoctorsList(this.patient_id).subscribe((res=>{
        this.mydoctors=res
        this.mydoctors.forEach((value, index)=>{
          this.doctoridlist.push(value._id)
        })
        console.log(this.doctoridlist)
      }))



    }, );
  }

  check(id:string){


    if(this.doctoridlist.includes(id)){
      return true;
    }else{
      return false;
    }
  }

  appoinment(id:string){
    if(this.check(id)){
      this.toastr.warning("This doctor already your doctor")
    }else{
      this.router.navigate(['appoinment/'+id])
    }
  }

  myDoctors(event:any){
    if(event.target.checked){
      this.temp2data=this.tempdata;
      this.tempdata=this.mydoctors;
      this.filterdData=this.tempdata;
    }else{
      this.mydoctors=this.tempdata;
      this.tempdata=this.temp2data
      this.filterdData=this.tempdata

    }
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
