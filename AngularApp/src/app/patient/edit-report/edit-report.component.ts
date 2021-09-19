import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit {
  report = new FormGroup({
    name:new FormControl(''),

  })
  data = {
    name: "Shalika",
    dob: "1997/06/16",
    email: "shalika@gmail.com",
    
  }
  constructor(
    private router:Router,
    private auth:AuthenticationService,
    private route:ActivatedRoute,
    private Report:ReportsService,
    
  ) { }

  ngOnInit(): void {
  }

  logout(){

    this.auth.logout();
      }

  //editReport(){
    //this.Report.editReport(this.data).subscribe(result=>{
      //console.log(result.message)
    //});
  //}

  
  /*

  editReport(report:any){
   

      this.report.updateReport(report, this.data).subscribe(result=>{
          this.message.success("Update Successfully", "Updating Doctor");





      });
      


  





  }*/



}
