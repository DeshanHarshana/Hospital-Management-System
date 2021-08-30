import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-add-patients',
  templateUrl: './doctor-add-patients.component.html',
  styleUrls: ['./doctor-add-patients.component.css']
})
export class DoctorAddPatientsComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('access');
    this.router.navigate(['/']);
  }
}
