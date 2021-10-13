import { Component, OnInit, ViewChild } from '@angular/core';
import { PharmacistService } from 'src/app/services/pharmacist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  constructor(
    private pharmacyService:PharmacistService
  ){

  }
  ngOnInit(): void {

  }


}
