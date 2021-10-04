import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WardService } from 'src/app/services/ward.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-show-wardpage',
  templateUrl: './show-wardpage.component.html',
  styleUrls: ['./show-wardpage.component.css']
})
export class ShowWardpageComponent implements OnInit {
  data:any=[

  ]
  

  
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private ward:WardService
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id);
    setTimeout(() => {
      this.ward.getWarddetails(this.route.snapshot.params.id).subscribe(res =>{
        console.log(res);
        this.data=res;

      })
    },10)
  }

  logout(){

    this.auth.logout();
  }

  gotoEdit()
  {
    this.router.navigate(['Admin-edit-ward-details/' + this.route.snapshot.params.id])
  }

}
