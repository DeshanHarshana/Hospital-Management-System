import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WardService } from 'src/app/services/ward.service';
import {FormControl, FormGroup} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';
import { AdminService } from 'src/app/services/admin.service';
import { PharmacistService } from 'src/app/services/pharmacist.service';

@Component({
  selector: 'app-edit-ward-details',
  templateUrl: './edit-ward-details.component.html',
  styleUrls: ['./edit-ward-details.component.css']
})
export class EditWardDetailsComponent implements OnInit {
  assignDoctorfield:boolean=false;
  doctorlist:any=[];
  admindata:any=[]
  cancel:boolean=false;
  ward=new FormGroup({
    wardid:new FormControl(''),
    wardno:new FormControl(''),
    departmentid:new FormControl(''),
    departmentname:new FormControl(''),
    noofbeds:new FormControl(''),
    noofpatients:new FormControl(''),
    doctor:new FormControl('')
  })

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private wardservice:WardService,
    public toastr:ToastrService,
    public doctorService:DoctorService,
    private admin:AdminService,
    private pharmacyService:PharmacistService
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id);
    setTimeout(() => {
      this.wardservice.getWarddetails(this.route.snapshot.params.id).subscribe(res =>{
        console.log(res);
        this.ward.get('wardid')?.setValue(res.wardid);
        this.ward.get('wardno')?.setValue(res.wardno);
        this.ward.get('departmentid')?.setValue(res.departmentid);
        this.ward.get('departmentname')?.setValue(res.departmentname);
        this.ward.get('noofbeds')?.setValue(res.noofbeds);
        this.ward.get('noofpatients')?.setValue(res.noofpatients);
        this.ward.get('doctor')?.setValue(res.doctor);




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

  /*update(data:any){
    this.ward.updatewarddetails(this.route.snapshot.params.id,data).subscribe(res=>{
      console.log("Successfully Updated");
    })
  }*/

  update(ward:any){

    this.wardservice.updatewarddetails(ward,this.route.snapshot.params.id).subscribe(res=>{
      this.toastr.success("Update Successfully", "Updating Ward details");
      setTimeout(()=>{
        this.router.navigate(['Admin-dashboard']);
      });
    })
  }
  assign(){
    setTimeout(() => {
      this.doctorService.getAllDoctors().subscribe(res=>{
        this.doctorlist=res;
        this.assignDoctorfield=true;
        console.log(this.doctorlist)
      })
    },);

  }
}
