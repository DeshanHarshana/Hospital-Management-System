import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PatientService } from 'src/app/services/patient.service';
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
  access=false;
  patientData:any=[]
  routePath="";
  constructor(
    private router:Router,
    private auth:AuthenticationService,
    private route:ActivatedRoute,
    private patient:PatientService
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
        this.sugerLevel=res.bloodsuger;
        this.presureLevel=res.bloodpresure;
      })
    },100);



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

}
