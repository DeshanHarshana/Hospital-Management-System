import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MedicalunitService } from '../services/medicalunit.service';
@Component({
  selector: 'app-show-medical-unit',
  templateUrl: './show-medical-unit.component.html',
  styleUrls: ['./show-medical-unit.component.css']
})
export class ShowMedicalUnitComponent implements OnInit {

  data:any=[];
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
        this.data=res;
      })

    },10)
  }

  logout(){

    this.auth.logout();
      }

    gotoEdit()
    {
      this.router.navigate(['edit-medical-unit/'+ this.route.snapshot.params.id]);
    }

}
