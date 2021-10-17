import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appoinment } from 'src/app/appdata/Appoinment';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-all-appoinment-list',
  templateUrl: './all-appoinment-list.component.html',
  styleUrls: ['./all-appoinment-list.component.css']
})
export class AllAppoinmentListComponent implements OnInit {
  tempdata: Appoinment[] = [];
  p: number = 1;
  filterdData: any = [];
  currentPatient: any;
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private patient: PatientService,
    private apt: AppoinmentService
  ) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.apt.getAllAppoinment
      this.apt
        .getAllAppoinment()
        .subscribe((res) => {
          this.tempdata = res;
          this.filterdData = this.tempdata;
        });
    });
  }
  logout() {
    this.auth.logout();
  }
  deleteAppoinment(appointmnetid:string, doctorid:string){
    let appoinmentdata={
      appointmentid:appointmnetid
    }
this.apt.deleteAppoinmentinDoctorlist(doctorid,appoinmentdata).subscribe(res=>{
  this.apt.deleteAppoinment(appointmnetid).subscribe(res2=>{
    console.log(res2);

    this.router.navigate(['Admin-show-all-appoinment-list']);
  })
})
  }
}
