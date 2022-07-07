import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-response-reset-patient',
  templateUrl: './response-reset-patient.component.html',
  styleUrls: ['./response-reset-patient.component.css']
})
export class ResponseResetPatientComponent implements OnInit {

  token:string="";
  validity:boolean=false;
  hasData:boolean=false;
  message:string="";
  hasError:boolean=false;
  constructor(
    private patient:PatientService,
    private router: Router,
    private route: ActivatedRoute) {

   
  }
  resetForm=new FormGroup({
    newPassword:new FormControl(''),
    confirmPassword:new FormControl('')
  })

  check(){
    if(this.resetForm.get('confirmPassword')?.value!=this.resetForm.get('newPassword')?.value){
      this.message="Confirm password dosen't match with new password"
      this.hasError=true;
    }else{
      this.hasError=false;
    }
    
  }
  Test(reset:any){
    var data={
      email:localStorage.getItem('forgotPasswordId'),
      newpassword:reset.newPassword

    }
    this.patient.forgotPassword(data).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/']);
    })

    
  }

  ngOnInit() {
    this.token=this.route.snapshot.params.token;
    console.log("token : " + this.token)
    this.patient.ValidPasswordToken({token:this.token}).subscribe((res)=>{
      this.hasData=true;
      if(res.message=="valid"){
        this.validity=true;
      }else{
        this.validity=false;
      }
    })
    
  }


}
