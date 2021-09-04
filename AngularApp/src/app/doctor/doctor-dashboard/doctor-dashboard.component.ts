import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService

  ) { }

  ngOnInit(): void {

  }

  logout(){

    this.auth.logout();
      }

}
