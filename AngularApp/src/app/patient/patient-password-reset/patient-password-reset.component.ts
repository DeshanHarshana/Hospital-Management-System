import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-password-reset',
  templateUrl: './patient-password-reset.component.html',
  styleUrls: ['./patient-password-reset.component.css']
})
export class PatientPasswordResetComponent implements OnInit {
  patientname:string="";
  displayImage:string="";
  patient_id : string = '';

  haserror:boolean=false;
  patientdata:any=[];
  currentpatient:string="";
  message="xx";
  password:any="";
  resetForm=new FormGroup({
    
    currentPassword:new FormControl(''),
    newPassword:new FormControl(''),
    confirmPassword:new FormControl('')


  })
  constructor(
    private patient:PatientService,
    public toastr:ToastrService,
    public router:Router,
    public route:ActivatedRoute,
    private auth:AuthenticationService

  ) { }

  ngOnInit(): void { 
    this.patient_id = localStorage.getItem('patientid') || '';
  console.log(this.patient_id);

  this.patient.getonePatient(this.patient_id).subscribe(res=>{
    this.patientname=res.name;
    this.displayImage=res.displayImage;
  })
  }
  

  check(){
    if(this.resetForm.get('confirmPassword')?.value!=this.resetForm.get('newPassword')?.value){
      this.message="Confirm password dosen't match with new password"
      this.haserror=true;
    }else{
      this.haserror=false;
    }
    
  }

  Test(reset:any){
    var data={
      currentPassword:reset.currentPassword,
      patientid:localStorage.getItem('patientid'),
      newpassword:reset.newPassword

    }
    this.patient.resetPassword(data).subscribe((res)=>{
      console.log(res.message)
      this.message="";
      if(res.message=="wrong password"){
        
        this.message="Wrong Password";
        this.haserror=true;
      }
      if(res.message=="Error updating"){
        this.message="Updating process has some problem"
      }
      if(res.message=="successfully updated"){
        this.haserror=false;
        this.router.navigateByUrl("/Patient-dashboard")
       // this.router.navigate(['Doctor-dashboard'])
      }
    })

    
  }

  goHome(){
    const access=localStorage.getItem('access')
    console.log(access);
    if(access=="admin"){
      this.router.navigate(['Admin-dashboard'])
    }else if(access=='doctor'){
      this.router.navigate(['Doctor-dashboard/'+localStorage.getItem('doctorid')])
    }else if(access=='patient'){
      this.router.navigate(['Patient-dashboard'])
    }else{
      this.router.navigate(['/']);
    }
  }
  logout(){

    this.auth.logout();
      }
}
