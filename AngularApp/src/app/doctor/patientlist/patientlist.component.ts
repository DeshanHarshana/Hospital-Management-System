import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appoinment } from 'src/app/appdata/Appoinment';
import { Patient } from 'src/app/appdata/Patient';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {

  p: number = 1;
  filterdData: any = [];
  currentDoctor: any;
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private patient: PatientService,
    private apt: AppoinmentService,
    private doctorService:DoctorService
  ) {}

  ngOnInit(): void {
    this.currentDoctor = String(localStorage.getItem('doctorid') || '');
    setTimeout(() => {
      this.doctorService.getPatientList(this.currentDoctor).subscribe(res=>{
        this.filterdData=res;
        console.log(this.filterdData)
      })
    });
  }
  logout() {
    this.auth.logout();
  }

}
