import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService

  ) { }

  ngOnInit(

  ): void {


  }

  logout(){

    this.auth.logout();
      }

}
