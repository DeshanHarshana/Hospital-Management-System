import { Component, OnInit } from '@angular/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  time = {hour: 13, minute: 30};
  constructor() { }

  ngOnInit(): void {
  }


}
