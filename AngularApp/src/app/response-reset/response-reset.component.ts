import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../services/doctor.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  token:string="";
  validity:boolean=false;
  hasData:boolean=false;
  message:string="";
  hasError:boolean=false;
  constructor(
    private doctor: DoctorService,
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
    this.doctor.forgotPassword(data).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/']);
    })

    
  }

  ngOnInit() {
    this.token=this.route.snapshot.params.token;
    console.log("token : " + this.token)
    this.doctor.ValidPasswordToken({token:this.token}).subscribe((res)=>{
      this.hasData=true;
      if(res.message=="valid"){
        this.validity=true;
      }else{
        this.validity=false;
      }
    })
    
  }


}
