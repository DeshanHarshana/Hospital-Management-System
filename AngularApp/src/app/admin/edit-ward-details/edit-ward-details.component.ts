import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit-ward-details',
  templateUrl: './edit-ward-details.component.html',
  styleUrls: ['./edit-ward-details.component.css']
})
export class EditWardDetailsComponent implements OnInit {

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  logout(){

    this.auth.logout();
  }

}
