import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-show-profile',
  templateUrl: './patient-show-profile.component.html',
  styleUrls: ['./patient-show-profile.component.css']
})
export class PatientShowProfileComponent implements OnInit {

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
