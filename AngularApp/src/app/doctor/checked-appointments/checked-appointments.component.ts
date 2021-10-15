import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-checked-appointments',
  templateUrl: './checked-appointments.component.html',
  styleUrls: ['./checked-appointments.component.css']
})
export class CheckedAppointmentsComponent implements OnInit {
  data=[
    {},
    {},
    {},
    {},
    {}
  ]

  currentPatient: any;
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private patient: PatientService,
    private apt: AppoinmentService
  ) {}

  ngOnInit(): void {

    setTimeout(() => {

  })}
  logout() {
    this.auth.logout();
  }
}
