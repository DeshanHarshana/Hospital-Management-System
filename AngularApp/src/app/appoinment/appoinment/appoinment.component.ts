import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-appoinment',
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.css']
})
export class AppoinmentComponent implements OnInit {

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
