import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit {

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
