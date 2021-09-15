import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reportlist',
  templateUrl: './reportlist.component.html',
  styleUrls: ['./reportlist.component.css']
})
export class ReportlistComponent implements OnInit {
  data=[
  {
    name:"Deshan",
    time:"2018/2/3"
  },
  {
    name:"Deshan",
    time:"2018/2/3"
  }
  ,{
    name:"Deshan",
    time:"2018/2/3"
  },
  {
    name:"Deshan",
    time:"2018/2/3"
  },
  {
    name:"Deshan",
    time:"2018/2/3"
  },
]
  constructor(
    private auth:AuthenticationService,
  ) { }

  ngOnInit(): void {
  }
  logout(){

    this.auth.logout();
      }
}
