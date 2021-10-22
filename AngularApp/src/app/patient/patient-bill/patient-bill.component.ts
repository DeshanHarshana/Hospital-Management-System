import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {NgxPrintModule} from 'ngx-print';
@Component({
  selector: 'app-patient-bill',
  templateUrl: './patient-bill.component.html',
  styleUrls: ['./patient-bill.component.css']
})
export class PatientBillComponent implements OnInit {
  patient_id : string = '';
  @ViewChild('myDiv') myDiv!: ElementRef;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService

  ) { }

  ngOnInit(): void {
    this.patient_id = localStorage.getItem('patientid') || '';
    console.log(this.patient_id);


  }
  logout(){

    this.auth.logout();
      }
      printDiv(){
        var printContents = this.myDiv.nativeElement.innerHTML
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
        window.location.reload()

      }
}
