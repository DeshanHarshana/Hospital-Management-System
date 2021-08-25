import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  constructor(
    private router:Router,
    private route:ActivatedRoute

  ) { }

  ngOnInit(): void {

  }
  addPatient(){
    this.router.navigate(['Doctor-DoctorAddpatient'], {relativeTo : this.route});

  }
  gotoHome(){
this.router.navigate(['Doctor-dashboard'])
  }
}
