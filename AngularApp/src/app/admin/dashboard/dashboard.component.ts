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
  ) {
     }

     logout(){
      localStorage.removeItem('access');
      this.router.navigate(['/']);
    }
  ngOnInit(): void {


  }
}
