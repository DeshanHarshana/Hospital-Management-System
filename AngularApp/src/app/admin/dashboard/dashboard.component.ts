import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  main:boolean=true;
  constructor(
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  gotoHome(){
    this.main=true;
    this.router.navigate(['Admin-dashboard'])
  }
  doctorDetails(){
    this.main=false;
    this.router.navigate(['Admin-Add-Doctor'], {relativeTo:this.route});
  }
  listofDoctors(){
    this.main=false;
    this.router.navigate(['Admin-show-doctorlist'], {relativeTo:this.route})
  }
}
