import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PharmacistService } from 'src/app/services/pharmacist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {
  admindata:any=[]
  data:any=[];
  cancel:boolean=false;
  constructor(
    private doctorService:DoctorService,
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private admin:AdminService,
    public toastr:ToastrService,
    private pharmacyService:PharmacistService
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.admin.getAdmin().subscribe(res=>{
        this.admindata=res;
      });
      this.doctorService.getAllDoctors().subscribe(
        res=>{
          this.data=res;
        }
      )
  });
  }
  testroute(){

this.router.navigate(['Admin-edit-doctor-details'])
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
      available(available:boolean, id:string){
        if(available){
          var data={
            available:false
          }
          this.doctorService.changeAvalilability(id, data).subscribe(res=>{
            this.toast("");
            this.ngOnInit();
          })
        }else{
          var data={
            available:true
          }
          this.doctorService.changeAvalilability(id, data).subscribe(res=>{
            this.toast("")
            this.ngOnInit();
          })
        }
      }
      toast(message:String) {
        this.toastr.warning(message.toString(), "Change Availability");
       }
}
