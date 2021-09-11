import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit {
  constructor(
    private router:Router,
    private auth:AuthenticationService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  logout(){

    this.auth.logout();
      }



}
