import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-requeest-reset-patient',
  templateUrl: './requeest-reset-patient.component.html',
  styleUrls: ['./requeest-reset-patient.component.css']
})
export class RequeestResetPatientComponent implements OnInit {
  RequestResetForm: FormGroup = new FormGroup({});
  forbiddenEmails: any;
  errorMessage: string ="";
  successMessage: string ="";
  IsvalidForm = true;
  email:string="";
  id:string="";
  constructor(
    private authService: PatientService,
    private router: Router,
   ) {

  }


  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }


  RequestResetUser(form: { valid: any; }) {
    console.log(form)
    if (form.valid) {
      this.IsvalidForm = true;
      this.email=this.RequestResetForm.value.email;
      this.authService.requestReset(this.RequestResetForm.value).subscribe(
        data => {
          this.RequestResetForm.reset();
          this.successMessage = "Reset password link send to email sucessfully.";
          // this.authService.getIdusingEmail(this.email).subscribe(res=>{
          //   localStorage.setItem('forgotPasswordId', res._id);
          // })
          localStorage.setItem('forgotPasswordId', this.email);
          //localStorage.setItem('fogotPasswordEmai')
          setTimeout(() => {
            this.successMessage = "";
            this.router.navigate(['/']);
          }, 3000);
        },
        err => {

          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }

}
