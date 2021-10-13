import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-show-prescription',
  templateUrl: './show-prescription.component.html',
  styleUrls: ['./show-prescription.component.css']
})
export class ShowPrescriptionComponent implements OnInit {

  constructor(
    private auth:AuthenticationService
  ) { 
    
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}
