import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  patientname:string="";
  displayImage:string="";
  patient_id : string = '';
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private patient:PatientService

  ) { }

  ngOnInit(

  ): void {
    this.patient_id = localStorage.getItem('patientid') || '';
    console.log(this.patient_id);

    this.patient.getonePatient(this.patient_id).subscribe(res=>{
      this.patientname=res.name;
      this.displayImage=res.displayImage;
    })


  }

  logout(){

    this.auth.logout();
      }

}
