import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  main:boolean=true;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService
  ) {
     }

     logout(){

      this.auth.logout();
        }
  ngOnInit(): void {


  }
}
