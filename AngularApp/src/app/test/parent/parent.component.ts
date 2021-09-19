import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { FormArray } from '@angular/forms';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  example = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),

    
  });
  constructor(private test: TestService, private router: Router) {
    
  }


  ngOnInit(): void {}
  send(value: any) {
    this.test.setData(value);
    this.router.navigate(['/child']);
  }



}