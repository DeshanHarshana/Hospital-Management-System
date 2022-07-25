import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WardService } from 'src/app/services/ward.service';
import {FormControl, FormGroup} from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { PharmacistService } from 'src/app/services/pharmacist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-wardpage',
  templateUrl: './show-wardpage.component.html',
  styleUrls: ['./show-wardpage.component.css']
})
export class ShowWardpageComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
  data:any=[

  ]
  admindata:any=[]

  cancel:boolean=false;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private ward:WardService,
    private admin:AdminService,
    private pharmacyService:PharmacistService
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
    console.log(this.route.snapshot.params.id);
    setTimeout(() => {
      this.ward.getWarddetails(this.route.snapshot.params.id).subscribe(res =>{
        console.log(res);
        this.data=res;

      });
      this.admin.getAdmin().subscribe(res=>{
        this.admindata=res;
      });
    },10)
  }

  addPhamasisit(){
    Swal.fire({
      showDenyButton: true,
      denyButtonText: 'No',
      allowOutsideClick: false,
      title: 'Assign New Pharmacist',
      html: `
      <input type="text"  name="name" class="swal2-input" placeholder="Pharmacist Name">
      <input type="email"  name="email" class="swal2-input" placeholder="Pharmacist Email">
      <input type="password"  name="password" class="swal2-input" placeholder="Type a Password">`,
      confirmButtonText: 'Assign',
      preDeny:()=>{
        this.cancel=true;
        console.log("dfdf")
      },

      preConfirm: () => {
        const name =  Swal.getPopup()?.getElementsByTagName('input').namedItem('name')?.value
        const email =  Swal.getPopup()?.getElementsByTagName('input').namedItem('email')?.value
        const password = Swal.getPopup()?.getElementsByTagName('input').namedItem('password')?.value
        if (!email || !password || !name) {
          Swal.showValidationMessage(`Please enter login and password`)
        }
        return {name:name, email: email, password: password }
      }

    }).then((result) => {
      console.log(result.value)
      if(!this.cancel){
      this.pharmacyService.addPharmacist(result.value).subscribe((res)=>{
        Swal.fire(
          'Success!',
          'New Pharmacist Assigned',
          'success'
        )
      })
    }

    }).catch((reason)=>{
      console.log(reason)
    }).finally(()=>{
      this.cancel=false;
    })

  }


  logout(){

    this.auth.logout();
  }

  gotoEdit()
  {
    this.router.navigate(['Admin-edit-ward-details/' + this.route.snapshot.params.id])
  }

}
