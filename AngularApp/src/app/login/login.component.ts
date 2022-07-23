import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';
import { LocationStrategy } from '@angular/common';
import { LoaderService } from '../loader/loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('emailRef', {static:false}) emailElement:ElementRef | undefined;
  role:string="";
  id:number=0;
  isPatient:boolean=true;
  isAdmin:boolean=false;
  dropdownId="jnl"
  loginForm=new FormGroup({
    no:new FormControl(''),
    email:new FormControl(''),
    password:new FormControl('')
  })


  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);

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
    //this code for disable back button in broweser

    // history.pushState(null,"", window.location.href);
    // this.location.onPopState(() => {
    //   history.pushState(null, "", window.location.href);
    // });

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
   ngAfterViewInit() {
     //same to get element by id
      //this.emailElement?.nativeElement.focus();
      document.getElementById('email')?.focus();

   }
   Pharmacist(){
     this.router.navigate(['login/'+ 4])
     this.role="Pharmacist"
     this.id=4;
     this.loginForm.get('no')?.setValue(4);
   }

  ngOnInit(): void {
    localStorage.removeItem('access');
    this.id=this.route.snapshot.params.id;
    if(this.id==1){
      this.role="Admin";
      this.isAdmin=true;
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
   forgotPassword(){
     if(this.role=="Doctor"){
        this.router.navigate(['request-reset-password']);
     }
     else if(this.role=="Patient"){
       this.router.navigate(['request-reset-password-patient']);
     }
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
            console.log(res)
            localStorage.setItem("access",'admin');
            this.router.navigate(['Admin-dashboard'])
          }else if(this.id==2){
            localStorage.setItem("access",'doctor');
            localStorage.setItem("doctorid", res.doctorid);
            this.router.navigate(['Doctor-dashboard'])
          }else if(this.id==3){
            localStorage.setItem("access",'patient');
            localStorage.setItem("patientid", res.patientid);
            this.router.navigate(['Patient-dashboard'])
          }
          else if(this.id==4){
            localStorage.setItem("access",'pharmacist');
            localStorage.setItem("pharmacistid", res.pharmacistid);
            this.router.navigate(['pharmacy-home'])
          }
        }
      }
    )
  }

}
