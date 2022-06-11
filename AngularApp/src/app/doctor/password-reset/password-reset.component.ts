import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  displayImage="";
  haserror:boolean=false;
  doctordata:any=[];
  currentDoctor:string="";
  message="xx";
  password:any="";
  resetForm=new FormGroup({
    
    currentPassword:new FormControl(''),
    newPassword:new FormControl(''),
    confirmPassword:new FormControl('')


  })

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private doctor:DoctorService,
   
  ) { }

  ngOnInit(): void {
    this.currentDoctor=String(localStorage.getItem('doctorid') || '');
    setTimeout(() => {
      this.doctor.getoneDoctor(this.currentDoctor).subscribe(res=>{
        this.doctordata=res;
        this.displayImage=this.doctordata.displayImage;
      });
    });
  }
  profile(){
    this.router.navigate(['show-doctor-details/'+localStorage.getItem('doctorid')])
  }
  patient(){
    this.router.navigate(['DoctorPatientList/'+localStorage.getItem('doctorid')])
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
      doctorid:localStorage.getItem('doctorid'),
      newpassword:reset.newPassword

    }
    this.doctor.resetPassword(data).subscribe((res)=>{
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
        this.router.navigateByUrl("/Doctor-dashboard")
       // this.router.navigate(['Doctor-dashboard'])
      }
    })

    
  }

  logout(){

    this.auth.logout();
      }

}
