import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  
  logout(){
    localStorage.removeItem('access');
    this.router.navigate(['/']);
  }

}
