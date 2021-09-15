import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-show-medical-unit',
  templateUrl: './show-medical-unit.component.html',
  styleUrls: ['./show-medical-unit.component.css']
})
export class ShowMedicalUnitComponent implements OnInit {

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
