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
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
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
  ) {
    setInterval(() => {
      this.time = new Date();
   }, 1000);

   this.decide();
   }
   decide() {
    this.hours = new Date().getHours();
    console.log("this.hours",this.hours)
    if(this.hours < 10){
      this.msg = "Good Morning"
      this.link = "wwww.google.com"
      console.log("selamat Pagi")
    }else if(this.hours < 16){
      this.msg = "Good Afternoon"
      this.link = "wwww.tokopedia.com"
      console.log("selamat siang")
    }else if(this.hours < 19){
      this.msg = "Good Evening"
    }else if(this.hours < 24){
      this.msg = "Good Night"
      this.link = "wwww.sprout.co.id"
      console.log("selamat malam")
    }else if(this.hours < 6){
      this.msg = "Sleep lah"
      this.link = "www.mangabat.com"
      console.log("selamat subuh")
    }
  }

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
