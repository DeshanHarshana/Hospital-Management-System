import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MedicalunitService } from '../services/medicalunit.service';
import Swal from 'sweetalert2';
import { PharmacistService } from '../services/pharmacist.service';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-show-medical-unit',
  templateUrl: './show-medical-unit.component.html',
  styleUrls: ['./show-medical-unit.component.css']
})
export class ShowMedicalUnitComponent implements OnInit {

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

  ) { }

  ngOnInit(


  ): void {

    console.log(this.route.snapshot.params.id);
    setTimeout(()=>{
      this.medicalUnit.getmedicalData(this.route.snapshot.params.id).subscribe(res=>{
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
      this.router.navigate(['edit-medical-unit/'+ this.route.snapshot.params.id]);
    }

}
