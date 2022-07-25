import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AdminService } from '../services/admin.service';
import { MedicalunitService } from '../services/medicalunit.service';
import { PharmacistService } from '../services/pharmacist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-medical-unit',
  templateUrl: './edit-medical-unit.component.html',
  styleUrls: ['./edit-medical-unit.component.css']
})
export class EditMedicalUnitComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
  data:any=[];
  cancel:boolean=false;
  admindata:any=[]
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private medicalUnit:MedicalunitService,
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
  
  medical=new FormGroup({


    catogary:new FormControl(''),
    Icu:new FormControl(''),
    NIcu:new FormControl(''),
    Scu:new FormControl(''),
    mentorDoc:new FormControl(''),
    countOfDoc:new FormControl(''),
    mentorNur:new FormControl(''),
    countOfNur:new FormControl(''),
    TotalNoBed:new FormControl(''),
    TotalNoEqu:new FormControl(''),

  })


  
  ngOnInit(

  ): void {
    console.log(this.route.snapshot.params.id);
    setTimeout(()=>{

      this.medicalUnit.getmedicalData(this.route.snapshot.params.id).subscribe(res=>{
        console.log(res);
        this.medical.get('catogary')?.setValue(res.catogary);
        this.medical.get('Icu')?.setValue(res.Icu);
        this.medical.get('NIcu')?.setValue(res.NIcu);
        this.medical.get('Scu')?.setValue(res.Scu);
        this.medical.get('mentorDoc')?.setValue(res.mentorDoc);
        this.medical.get('countOfDoc')?.setValue(res.countOfDoc);
        this.medical.get('mentorNur')?.setValue(res.mentorNur);
        this.medical.get('countOfNur')?.setValue(res.countOfNur);
        this.medical.get('TotalNoBed')?.setValue(res.TotalNoBed);
        this.medical.get('TotalNoEqu')?.setValue(res.TotalNoEqu);
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
update(data:any){


  this.medicalUnit.updatemedicalUnit(this.route.snapshot.params.id, data).subscribe(res=>{
    this.router.navigate(['Admin-dashboard']);
  })

}
}
