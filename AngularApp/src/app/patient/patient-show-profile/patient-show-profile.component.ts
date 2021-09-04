import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
@Component({
  selector: 'app-patient-show-profile',
  templateUrl: './patient-show-profile.component.html',
  styleUrls: ['./patient-show-profile.component.css']
})
export class PatientShowProfileComponent implements OnInit {
  bloodsuger="../../../assets/patient/blood-drop.svg"
  bloodpresure="../../../assets/patient/hypertension.svg";
  cholestrol="../../../assets/patient/blood-test.svg";
  constructor(
    private router:Router,
    private auth:AuthenticationService
  ) { }

  ngOnInit(): void {
  }
  logout(){

    this.auth.logout();
      }

}
