import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
  
  constructor(
    private router:Router
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
    const access= localStorage.getItem('access') || "";
   if(access=="admin"){
    this.router.navigate(['Admin-dashboard'])
   }
   else if(access=="patient"){
    this.router.navigate(['Patient-dashboard'])
   }
   else if(access=="doctor"){
    this.router.navigate(['Doctor-dashboard'])
   }
   else{
    this.router.navigate(['index'])
   }
  }

  Admin(){
    this.router.navigate(['login/'+1])
  }
  Doctor(){
    this.router.navigate(['login/'+2])
  }
  Patient(){
    this.router.navigate(['login/'+3])
  }

  
  

  


}
