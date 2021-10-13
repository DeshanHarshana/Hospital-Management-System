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

  medical=new FormGroup({
    catogory: new FormControl(''),
    mentor: new FormControl(''),
    countOfDoctor: new FormControl(''),
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
    this.medicalUnit.getmedicalUnitData(this.route.snapshot.params.id).subscribe(res=>{
     console.log(res);
     this.medical.get('catogory')?.setValue(res.catogory);
     this.medical.get('mentor')?.setValue(res.mentor)
     this.medical.get('countOfDoctor')?.setValue(res.countOfDoctor)
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
