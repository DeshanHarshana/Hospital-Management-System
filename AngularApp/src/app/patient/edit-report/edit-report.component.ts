import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Methods } from 'src/app/appdata/methods';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css'],
  providers:[Methods]
})
export class EditReportComponent implements OnInit {
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


    doctorid:new FormControl(''),
    patientid:new FormControl(''),
    doctorname:new FormControl('')



  });

  currentPatient:string="";
  currentDoctor:string="";
  doctorName:string="";
  currentReport:string="";
  constructor(
    private auth:AuthenticationService,
    private reportS:ReportsService,
    private methods:Methods,
    private route:ActivatedRoute,
    private patient:PatientService,
    private doctor:DoctorService,
    private router:Router,
    public toastr:ToastrService,
  ) { }

  ngOnInit(): void {
    this.currentReport=this.route.snapshot.params.id;
    setTimeout(() => {
      this.reportS.getSingleReport(this.currentReport).subscribe(res=>{
        this.doctorName=res.doctorname;
        this.currentPatient=res.patientid;
        this.currentDoctor=res.doctorid;


        this.report.get('name')?.setValue(res.name);
      })

    }, 2);

  }

  logout(){

    this.auth.logout();
      }

      updateReport(report:any){
    report.date=this.methods.convert(report.date);
    report.doctorid=this.currentDoctor;
    report.patientid=this.currentPatient;
    report.doctorname=this.doctorName;

        this.reportS.updateReport(report, this.currentReport).subscribe(res=>{
          console.log(res);
          this.router.navigate(['show-report/'+ res._id]);
          this.toast("Updating Report Successfull")
        })
      }
      toast(message:String) {
        this.toastr.warning(message.toString(), "Updating Report");
       }
       toast2(message:String) {
        this.toastr.success(message.toString(), "Delete Report");
       }
       deleteReport(){
         let data={
            reportid:this.currentReport
         }
         this.reportS.deleteFromPatientList(data, this.currentPatient).subscribe(res=>{
           this.reportS.deleteReport(this.currentReport).subscribe(res=>{
             this.toast2("Deleting Successfull");
             this.router.navigate(['report-list/'+this.currentPatient]);
           })
         })
       }
}
