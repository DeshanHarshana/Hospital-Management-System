import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PrescriptionService } from 'src/app/services/prescription.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  prescriptionData:any=[];
  patientid:string=""
  constructor(
    private auth:AuthenticationService,
    private prescription:PrescriptionService
  ) { }

  ngOnInit(): void {
    this.patientid=localStorage.getItem('patientid') || "";
    setTimeout(()=>{
      this.prescription.getAllPatientPrescriptions(this.patientid).subscribe(res=>{
        this.prescriptionData=res;
      })
    })
  }
  logout(){

    this.auth.logout();
      }
}
