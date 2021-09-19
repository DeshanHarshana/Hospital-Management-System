import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ReportsService } from 'src/app/services/reports.service';


@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent implements OnInit {
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
    
    /*
    guardian: new FormControl(''),
    maritalStatus: new FormControl(''),
   
    */


    //Medical history component
    heartDisease:new FormControl(false),
    diabetes:new FormControl(false),
    hbp: new FormControl(false),
    canser:new FormControl(false),
    hc:new FormControl(false),
    kidney:new FormControl(false),
    stroke:new FormControl(false),
    dep:new FormControl(false),
    other:new FormControl(''),

    surgeries:new FormControl(''),
    medications:new FormControl(''),
    //Alergies

    

  });
  constructor(
    private auth:AuthenticationService,
    private reportS:ReportsService,
  ) { }

  ngOnInit(): void {
    
  }

  logout(){

    this.auth.logout();
      }

  addReport(report:any){
     console.log(report);

     /*this.reportS.addReport(report).subscribe(res=>{
       console.log(res);
     })*/
    }

}
