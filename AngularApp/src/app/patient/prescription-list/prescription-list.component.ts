import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientService } from 'src/app/services/patient.service';
import { PrescriptionService } from 'src/app/services/prescription.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  prescriptionData:any=[];
  patientid:string="";
  patientname:string="";
  displayImage:string="";
  patient_id : string = '';
  constructor(
    private auth:AuthenticationService,
    private prescription:PrescriptionService,
    private patient:PatientService
  ) { }

  ngOnInit(): void {
    this.patientid=localStorage.getItem('patientid') || "";
    setTimeout(()=>{
      this.prescription.getAllPatientPrescriptions(this.patientid).subscribe(res=>{
        this.prescriptionData=res;
      })
    });
    this.patient.getonePatient(this.patientid).subscribe(res=>{
      this.patientname=res.name;
      this.displayImage=res.displayImage;
    })
  }
  logout(){

    this.auth.logout();
      }
}
