import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MedicalunitService } from '../services/medicalunit.service';


@Component({
  selector: 'app-edit-medical-unit',
  templateUrl: './edit-medical-unit.component.html',
  styleUrls: ['./edit-medical-unit.component.css']
})
export class EditMedicalUnitComponent implements OnInit {
  cancel:boolean=false;
  medical=new FormGroup({


    catogary:new FormControl(''),
    Icu:new FormControl(''),
    NIcu:new FormControl(''),
    Scu:new FormControl(''),
    mentorDoc:new FormControl(''),
    countOfDoc:new FormControl(''),
    mentorNur:new FormControl(''),
    countOfNur:new FormControl(''),
    TotalNoBed:new FormControl(''),
    TotalNoEqu:new FormControl(''),

  })


  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private medicalUnit:MedicalunitService


  ) { }


  ngOnInit(

  ): void {
    console.log(this.route.snapshot.params.id);
    setTimeout(()=>{

      this.medicalUnit.getmedicalData(this.route.snapshot.params.id).subscribe(res=>{
        console.log(res);
        this.medical.get('catogary')?.setValue(res.catogary);
        this.medical.get('Icu')?.setValue(res.Icu);
        this.medical.get('NIcu')?.setValue(res.NIcu);
        this.medical.get('Scu')?.setValue(res.Scu);
        this.medical.get('mentorDoc')?.setValue(res.mentorDoc);
        this.medical.get('countOfDoc')?.setValue(res.countOfDoc);
        this.medical.get('mentorNur')?.setValue(res.mentorNur);
        this.medical.get('countOfNur')?.setValue(res.countOfNur);
        this.medical.get('TotalNoBed')?.setValue(res.TotalNoBed);
        this.medical.get('TotalNoEqu')?.setValue(res.TotalNoEqu);
      })


    },10)

  }


  logout(){

    this.auth.logout();
      }
update(data:any){


  this.medicalUnit.updatemedicalUnit(this.route.snapshot.params.id, data).subscribe(res=>{
    this.router.navigate(['Admin-dashboard']);
  })

}
}
