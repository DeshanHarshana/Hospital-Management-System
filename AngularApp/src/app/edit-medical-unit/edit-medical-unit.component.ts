import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-medical-unit',
  templateUrl: './edit-medical-unit.component.html',
  styleUrls: ['./edit-medical-unit.component.css']
})
export class EditMedicalUnitComponent implements OnInit {

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService

  ) { }

  ngOnInit(

  ): void {


  }

  logout(){

    this.auth.logout();
      }

}
