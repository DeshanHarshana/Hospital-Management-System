import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-patient-prescription',
  templateUrl: './patient-prescription.component.html',
  styleUrls: ['./patient-prescription.component.css']
})
export class PatientPrescriptionComponent implements OnInit {
  presid:string="";
  presData:any=[];
  medicine:any=[];
  contentClass="content mat-elevation-z8"
    constructor(

      private auth:AuthenticationService,
      private prescription:PrescriptionService,
      private route:ActivatedRoute,
      private router:Router,
      private location: Location

    ) { }

  ngOnInit(): void {
    this.presid=this.route.snapshot.params.id;

    setTimeout(()=>{
      this.prescription.getsinglePrescription(this.presid).subscribe(res=>{
        this.presData=res;
        this.medicine=res.medicine;

        console.log(Object.keys(this.medicine).length)
        if(Object.keys(this.medicine).length >=7){
          this.contentClass="content2 mat-elevation-z8"
        }
      })
    })

  }
  delete(){
    this.prescription.deletePrescription(this.presid).subscribe(res=>{
      console.log(res);
      this.location.back();
    })
  }
  logout(){

    this.auth.logout();
      }
}
