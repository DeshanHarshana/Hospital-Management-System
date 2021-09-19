import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Methods } from 'src/app/appdata/methods';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ReportsService } from 'src/app/services/reports.service';



@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'],
  providers:[Methods]
})
export class AddReportComponent implements OnInit {
  report = new FormGroup({
    name:new FormControl(''),
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
    heartDisease:new FormControl(false),
    diabetes:new FormControl(false),
    hbp: new FormControl(false),
    canser:new FormControl(false),
    hc:new FormControl(false),
    kidney:new FormControl(false),
    stroke:new FormControl(false),
    dep:new FormControl(false),
    surgeries:new FormControl(''),
    medications:new FormControl(''),
    latex:new FormControl(false),
    iodine:new FormControl(false),
    bromine:new FormControl(false),
    description:new FormControl(''),
    date:new FormControl(new Date()),
    sign:new FormControl(''),

    

  });
  constructor(
    private auth:AuthenticationService,
    private reportS:ReportsService,
    private methods:Methods
  ) { }

  ngOnInit(): void {
    
  }

  logout(){

    this.auth.logout();
      }

  addReport(report:any){
    report.date=this.methods.convert(report.date);
     console.log(report);

     /*this.reportS.addReport(report).subscribe(res=>{
       console.log(res);
     })*/
    }

}
