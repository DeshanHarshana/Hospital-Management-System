import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css']
})
export class ShowReportComponent implements OnInit {

  constructor(
    private auth:AuthenticationService,
  ) { }

  ngOnInit(): void {
  }
  logout(){

    this.auth.logout();
      }

}
