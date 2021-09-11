import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  data:any=[]
  constructor(
    private test:TestService
  ) { }

  ngOnInit(): void {
    this.data=this.test.getData();

  }

}
