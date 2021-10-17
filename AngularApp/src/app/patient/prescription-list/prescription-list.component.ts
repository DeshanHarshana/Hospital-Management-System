import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {

  constructor(
    private auth:AuthenticationService,
  ) { }

  ngOnInit(): void {
  }
  logout(){

    this.auth.logout();
      }
}
