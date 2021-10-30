import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reportlist',
  templateUrl: './reportlist.component.html',
  styleUrls: ['./reportlist.component.css']
})
export class ReportlistComponent implements OnInit {
  data:any=[];
  currentPatient:string="";
  role : string = '';
  canAccess : boolean = false; 
  constructor(
    private auth:AuthenticationService,
    private route:ActivatedRoute,
    private report:ReportsService
  ) { }

  ngOnInit(): void {
    this.currentPatient=this.route.snapshot.params.id;
    this.role = localStorage.getItem('access') || '';
    setTimeout(() => {
      this.report.getPatientReports(this.currentPatient).subscribe(res=>{
        this.data=res;
      })
    }, 20);

    if(this.role == 'doctor'){
      this.canAccess = true;
    }
    else{
      this.canAccess = false;
    }

  }
  logout(){

    this.auth.logout();
      }
}
