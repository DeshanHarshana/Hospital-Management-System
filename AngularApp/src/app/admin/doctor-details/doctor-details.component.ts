import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

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
