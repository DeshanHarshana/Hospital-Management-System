import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.navigate(['Admin-About'], {relativeTo : this.route});
  }
  doctorDetails(){
    this.router.navigate(['Admin-Doctor-Details'], {relativeTo : this.route});
  }
  patientDetails(){
    this.router.navigate(['Admin-Patient-Details'], {relativeTo : this.route});
  }
}
