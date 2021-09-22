import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-show-wardpage',
  templateUrl: './show-wardpage.component.html',
  styleUrls: ['./show-wardpage.component.css']
})
export class ShowWardpageComponent implements OnInit {

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
