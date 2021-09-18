import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit {
  report = new FormGroup({
    name:new FormControl(''),
    dob:new FormControl(''),
    age:new FormControl(''),
    guardian: new FormControl(''),
    gender: new FormControl(''),
    relationship:new FormControl(''),
    taddress: new FormControl(''),
    paddress: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    occupation: new FormControl(''),
    weight: new FormControl(''),
    height: new FormControl(''),
    medicalHistory: new FormControl(''),
    /*
    guardian: new FormControl(''),
    maritalStatus: new FormControl(''),

    */

  //for checkboxes health
  Heart_disease:new FormControl(false),
  Diabetes:new FormControl(true)

  });
  constructor(
    private auth:AuthenticationService,
  ) { }

  ngOnInit(): void {
  }

  logout(){

    this.auth.logout();
      }

  addReport(report:any){
     console.log(report);
    }

}
