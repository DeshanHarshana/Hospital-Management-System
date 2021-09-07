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

  patientData:any=[]
  constructor(
    private router:Router,
    private auth:AuthenticationService,
    private route:ActivatedRoute,
    private patient:PatientService
  ) { }

  ngOnInit(): void {

    const id=this.route.snapshot.params.id;
    console.log(id)
    setTimeout(() => {
      this.patient.getonePatient("61367b2bf405ba3f4ca526ca").subscribe(res=>{
        console.log(res)
        this.patientData=res;
        this.cholestrolLevel=res.cholestrol;
        this.sugerLevel=res.bloodsuger;
        this.presureLevel=res.bloodpresure;
      })
    },100);



  }
  logout(){

    this.auth.logout();
      }

}
