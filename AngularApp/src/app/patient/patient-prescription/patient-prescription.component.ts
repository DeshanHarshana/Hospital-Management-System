import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PrescriptionService } from 'src/app/services/prescription.service';

@Component({
  selector: 'app-patient-prescription',
  templateUrl: './patient-prescription.component.html',
  styleUrls: ['./patient-prescription.component.css']
})
export class PatientPrescriptionComponent implements OnInit {
  presid:string="";
  presData:any=[];
  medicine:any=[];
    constructor(

      private auth:AuthenticationService,
      private prescription:PrescriptionService,
      private route:ActivatedRoute,
      private router:Router

    ) { }

  ngOnInit(): void {
    this.presid=this.route.snapshot.params.id;

    setTimeout(()=>{
      this.prescription.getsinglePrescription(this.presid).subscribe(res=>{
        this.presData=res;
        this.medicine=res.medicine;
        console.log(this.presData)
      })
    })

  }
  logout(){

    this.auth.logout();
      }
}
