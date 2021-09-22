import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css']
})
export class ShowReportComponent implements OnInit {
  report = new FormGroup({


    heartDisease:new FormControl(false),
    diabetes:new FormControl(false),
    hbp: new FormControl(false),
    canser:new FormControl(false),
    hc:new FormControl(false),
    kidney:new FormControl(false),
    stroke:new FormControl(false),
    dep:new FormControl(false),

    latex:new FormControl(false),
    iodine:new FormControl(false),
    bromine:new FormControl(false),



  });
  reportData:any=[];
  currentReport:any="";
  constructor(
    private auth:AuthenticationService,
    private route:ActivatedRoute,
    private reports:ReportsService
  ) { }

  ngOnInit(): void {
    this.currentReport=this.route.snapshot.params.id;
    setTimeout(() => {
      this.reports.getSingleReport(this.currentReport).subscribe(res=>{
        this.reportData=res;
        this.report.get('heartDisease')?.setValue(res.heartDisease); this.report.controls['heartDisease'].disable();
        this.report.get('diabetes')?.setValue(res.diabetes); this.report.controls['diabetes'].disable();
        this.report.get('hbp')?.setValue(res.hbp); this.report.controls['hbp'].disable();
        this.report.get('canser')?.setValue(res.canser); this.report.controls['canser'].disable();
        this.report.get('hc')?.setValue(res.hc); this.report.controls['hc'].disable();
        this.report.get('kidney')?.setValue(res.kidney); this.report.controls['kidney'].disable();
        this.report.get('stroke')?.setValue(res.stroke); this.report.controls['stroke'].disable();
        this.report.get('dep')?.setValue(res.dep); this.report.controls['dep'].disable();

        this.report.get('latex')?.setValue(res.latex); this.report.controls['latex'].disable();
        this.report.get('iodine')?.setValue(res.iodine); this.report.controls['iodine'].disable();
        this.report.get('bromine')?.setValue(res.bromine); this.report.controls['bromine'].disable();

      })
    }, 20);
  }
  logout(){

    this.auth.logout();
      }

}
