import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appoinment } from 'src/app/appdata/Appoinment';
import { AdminService } from 'src/app/services/admin.service';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientService } from 'src/app/services/patient.service';
import { PharmacistService } from 'src/app/services/pharmacist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-appoinment-list',
  templateUrl: './all-appoinment-list.component.html',
  styleUrls: ['./all-appoinment-list.component.css']
})
export class AllAppoinmentListComponent implements OnInit {
  tempdata: Appoinment[] = [];
  p: number = 1;
  cancel:boolean=false;
  filterdData: any = [];
  admindata:any=[];
  currentPatient: any;
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private patient: PatientService,
    private apt: AppoinmentService,
    private admin:AdminService,

    private pharmacyService:PharmacistService
  ) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.apt.getAllAppoinment
      this.apt
        .getAllAppoinment()
        .subscribe((res) => {
          this.tempdata = res;
          this.filterdData = this.tempdata;
        });
        this.admin.getAdmin().subscribe(res=>{
          this.admindata=res;
        });
    });
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
  logout() {
    this.auth.logout();
  }
  deleteAppoinment(appointmnetid:string, doctorid:string){
    let appoinmentdata={
      appointmentid:appointmnetid
    }
this.apt.deleteAppoinmentinDoctorlist(doctorid,appoinmentdata).subscribe(res=>{
  this.apt.deleteAppoinment(appointmnetid).subscribe(res2=>{
    console.log(res2);

    this.ngOnInit();
  })
})
  }
}
