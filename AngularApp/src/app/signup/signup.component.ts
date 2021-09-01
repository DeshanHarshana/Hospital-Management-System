import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../loader/loader.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm=new FormGroup({
    name:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl(''),
    confirmPassword:new FormControl('')
  })

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    public toastr:ToastrService,
    public _auth:AuthenticationService,
    private location: LocationStrategy,
    public loaderService:LoaderService,
  ) { }

  ngOnInit(): void {
  }
  signup(form:any){
    this._auth.signup(form).subscribe(
      res=>{
        if(res.exist=="yes"){
          this.toast("You are already signin as patient, Please Signin");
        }
        else if(res.success=="no"){
          this.toast("Something went wrong");
        }
        else if(res.success=="yes"){
          this.router.navigate(['Patient-dashboard']);
        }
      }
    );
  }
  toast(message:String) {
    this.toastr.warning(message.toString(), "Signup Failed");
   }

}
