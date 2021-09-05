import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-doctor-add-patients',
  templateUrl: './doctor-add-patients.component.html',
  styleUrls: ['./doctor-add-patients.component.css']
})
export class DoctorAddPatientsComponent implements OnInit {

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
