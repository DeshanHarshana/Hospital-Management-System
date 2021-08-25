import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';
import { LocationStrategy } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  role:string="";
  id:number=0;
  isPatient:boolean=true;
  dropdownId="jnl"
  loginForm=new FormGroup({
    no:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl('')
  })

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    public toastr:ToastrService,
    public _auth:AuthenticationService,
    private location: LocationStrategy
  ) {
    //this code for disable back button in broweser

    // history.pushState(null,"", window.location.href);
    // this.location.onPopState(() => {
    //   history.pushState(null, "", window.location.href);
    // });

   }

  ngOnInit(): void {
    this.id=this.route.snapshot.params.id;
    if(this.id==1){
      this.role="Admin";
    }else if(this.id == 2){
      this.role="Doctor";
    }else if(this.id==3){
      this.role="Patient";
      this.isPatient=false;
    }
    this.loginForm.get('no')?.setValue(this.id);
  }
  toast(message:String) {
    this.toastr.warning(message.toString(), "Login Failed");
   }


  loginUser(user:any){
    console.log(user);

    this._auth.loginUser(user).subscribe(
      res=>{
        console.log(res)
        if(res.user == 'no'){
          this.toast("User not exist, Please enter correct login data");
        }else if(res.password == 'no'){
          this.toast("Wrong password");
        }else{
          if(this.id==1){
            this.router.navigate(['Admin-dashboard'])
          }else if(this.id==2){
            this.router.navigate(['Doctor-dashboard'])
          }else if(this.id==3){
            this.router.navigate(['Patient-dashboard'])
          }
        }
      }
    )
  }

}
