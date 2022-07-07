import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PatientService } from 'src/app/services/patient.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-patient-show-profile',
  templateUrl: './patient-show-profile.component.html',
  styleUrls: ['./patient-show-profile.component.css']
})
export class PatientShowProfileComponent implements OnInit {
  bloodsuger="../../../assets/patient/blood-drop.svg"
  bloodpresure="../../../assets/patient/hypertension.svg";
  cholestrol="../../../assets/patient/blood-test.svg";
  //medical details
  cholestrolLevel:number=0;
  sugerLevel:number=0;
  presureLevel:number=0;
  rcholestrolLevel:number=0;
  rsugerLevel:number=0;
  rpresureLevel:number=0;
  access=false;
  patientData:any=[]
  restriction:boolean=false;
  routePath="";
  constructor(
    private router:Router,
    private auth:AuthenticationService,
    private route:ActivatedRoute,
    private patient:PatientService,
    public toastr:ToastrService
  ) { }

  ngOnInit(): void {

    const id=this.route.snapshot.params.id;
    this.access=localStorage.getItem('access')=="admin";
    if(localStorage.getItem('access')=="patient"){
      this.routePath="Patient-dashboard";
    }
    else if(this.access){
      this.routePath="Admin-dashboard";
    }

    console.log(id)
    setTimeout(() => {
      this.patient.getonePatient(id).subscribe(res=>{
        console.log(res)

        this.patientData=res;
        this.cholestrolLevel=res.cholestrol;
        this.restriction=res.subscription;
        this.sugerLevel=res.bloodsuger;
        this.presureLevel=res.bloodpresure;
        this.rcholestrolLevel=Math.round((res.cholestrol * 100)/110);
        this.rsugerLevel=Math.round((res.bloodsuger*100)/200);
        this.rpresureLevel=Math.round((res.bloodpresure*100)/200);
      })
    },100);



  }
  addPrescription(){
    const access=localStorage.getItem('access')
    if(access=="doctor"){
      return false;
    }
    return true;
  }
  goHome(){
    const access=localStorage.getItem('access')
    console.log(access);
    if(access=="admin"){
      this.router.navigate(['Admin-dashboard'])
    }else if(access=='doctor'){
      this.router.navigate(['Doctor-dashboard'])
    }else if(access=='patient'){
      this.router.navigate(['Patient-dashboard'])
    }else{
      this.router.navigate(['/']);
    }
  }
  logout(){

    this.auth.logout();
      }
      toast(message:String) {
        this.toastr.warning(message.toString(), "warning");
       }
      restrict(id:any){
        if(this.restriction){
          this.toast("This reports are restricted");
        }else{
          this.router.navigate(['report-list/'+id])
        }
        //console.log(id);
      }

}
