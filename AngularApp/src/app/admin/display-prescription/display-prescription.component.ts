import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appoinment } from 'src/app/appdata/Appoinment';
import { Pres } from 'src/app/appdata/Pres';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientService } from 'src/app/services/patient.service';
import { PrescriptionService } from 'src/app/services/prescription.service';

@Component({
  selector: 'app-display-prescription',
  templateUrl: './display-prescription.component.html',
  styleUrls: ['./display-prescription.component.css']
})
export class DisplayPrescriptionComponent implements OnInit {
  cancel:boolean=false;
  tempdata: Pres[] = [];
  p: number = 1;
  filterdData: any = [];
  currentPatient: any;
  name:any;
  catogory:any="All Doctors";
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private patient: PatientService,
    private prescriptionService: PrescriptionService
  ) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.prescriptionService
        .getAllPrescription()
        .subscribe((res) => {
          this.tempdata = res;
          this.filterdData = this.tempdata;
        });
    });
  }
  logout() {
    this.auth.logout();
  }


  Search(){
    if(this.name==""){
      this.filterdData=this.tempdata;
    }else{
      this.filterdData=this.tempdata.filter(res=>{
       return res.pharmacy.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
      })
    }
  }
}
