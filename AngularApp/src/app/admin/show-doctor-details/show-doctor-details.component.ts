import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { Methods } from 'src/app/appdata/methods';
import { Patient } from 'src/app/appdata/Patient';
@Component({
  selector: 'app-show-doctor-details',
  templateUrl: './show-doctor-details.component.html',
  styleUrls: ['./show-doctor-details.component.css'],
  providers : [Methods]
})
export class ShowDoctorDetailsComponent implements OnInit {
  data:any=[];
  patientList:any=[];
  id:string="";
  ward=0;
  patient=0;
  displayImage="";
  doctordata:any=[];
  cancel:boolean=false;
  currentDoctor="";
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private doctorService:DoctorService,
    private auth:AuthenticationService,
    private method:Methods,
    private doctor:DoctorService

  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.currentDoctor=String(localStorage.getItem('doctorid') || '');

      this.doctor.getoneDoctor(this.currentDoctor).subscribe(res=>{
        this.doctordata=res;
        this.displayImage=this.doctordata.displayImage;
      })
      this.id=this.route.snapshot.params.id;
      this.doctorService.getoneDoctor(this.id).subscribe((res)=>{
        this.data=res;
        console.log(this.data);
        this.ward= this.method.doctorWard(this.data.type);
        this.patient=Object.keys(this.data.patient).length;
        //console.log(this.ward);
      });


    });
    setTimeout(()=>{
      this.doctorService.getPatientList(this.id).subscribe((res)=>{
        var list = Object.values(res);

        for(var i=0; i<Object.keys(res).length; i++){
          this.patientList.push(list[i])
        }
        //console.log(this.patientList);



      });


    })

  }
  logout(){
    localStorage.removeItem('access');
    this.router.navigate(['/']);
  }
}
