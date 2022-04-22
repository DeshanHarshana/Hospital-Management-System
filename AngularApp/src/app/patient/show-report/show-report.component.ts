import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css']
})
export class ShowReportComponent implements OnInit {
  report = new FormGroup({
    heartDisease:new FormControl({value: false, disabled: true}),
    diabetes:new FormControl({value: false, disabled: true}),
    hbp: new FormControl({value: false, disabled: true}),
    canser:new FormControl({value: false, disabled: true}),
    hc:new FormControl({value: false, disabled: true}),
    kidney:new FormControl({value: false, disabled: true}),
    stroke:new FormControl({value: false, disabled: true}),
    dep:new FormControl({value: false, disabled: true}),

    latex:new FormControl({value: false, disabled: true}),
    iodine:new FormControl({value: false, disabled: true}),
    bromine:new FormControl({value: false, disabled: true}),
});
  reportData:any=[];
  currentReport:any="";
  role:string='';
  displayImage="";
  doctordata:any=[];
  constructor(
    private auth:AuthenticationService,
    private route:ActivatedRoute,
    private reports:ReportsService,
    private router:Router,
    private doctor:DoctorService
  ) { }

  ngOnInit(): void {
    this.currentReport=this.route.snapshot.params.id;
    this.role = localStorage.getItem('access') || '';
    setTimeout(() => {
      this.reports.getSingleReport(this.currentReport).subscribe(res=>{
        this.reportData=res;
        this.report.get('heartDisease')?.setValue(res.heartDisease);
        this.report.get('diabetes')?.setValue(res.diabetes);
        this.report.get('hbp')?.setValue(res.hbp);
        this.report.get('canser')?.setValue(res.canser);
        this.report.get('hc')?.setValue(res.hc);
        this.report.get('kidney')?.setValue(res.kidney);
        this.report.get('stroke')?.setValue(res.stroke);
        this.report.get('dep')?.setValue(res.dep);

        this.report.get('latex')?.setValue(res.latex);
        this.report.get('iodine')?.setValue(res.iodine);
        this.report.get('bromine')?.setValue(res.bromine);
      })
    }, 20);
    this.doctor.getoneDoctor(localStorage.getItem('doctorid')||"").subscribe(res=>{
      this.doctordata=res;
      this.displayImage=res.displayImage;
      
    })
  }
  logout(){

    this.auth.logout();
      }
      profile(){
        this.router.navigate(['show-doctor-details/'+localStorage.getItem('doctorid')])
      }
      patientload(){
        this.router.navigate(['DoctorPatientList/'+localStorage.getItem('doctorid')])
      }
}

