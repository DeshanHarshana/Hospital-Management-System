import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pharmacist } from 'src/app/appdata/Pharmasist';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientService } from 'src/app/services/patient.service';
import { PharmacistService } from 'src/app/services/pharmacist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phamasist-list',
  templateUrl: './phamasist-list.component.html',
  styleUrls: ['./phamasist-list.component.css']
})
export class PhamasistListComponent implements OnInit {
  p:number=1;
  tempdata:Pharmacist[]=[]
  filterdData:any=[];
  name:any;
  cancel:boolean=false;
  admindata:any=[]
  constructor(
    private router:Router,
    private auth:AuthenticationService,
    private admin:AdminService,
    private pharmacyService:PharmacistService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.pharmacyService.getAllPhamasisit().subscribe(res=>{
        this.tempdata=res;
        this.filterdData=this.tempdata;
      });
      this.admin.getAdmin().subscribe(res=>{
        this.admindata=res;
      });
    }, );


  }
  seeDetails(value:string){
    this.router.navigate(['Admin-show-patient-details/'+value]);
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
      if(!this.cancel){
      this.pharmacyService.addPharmacist(result.value).subscribe((res)=>{
        setTimeout(()=>{
          this.ngOnInit();
        },1000)
      
        Swal.fire(
          'Success!',
          'New Pharmacist Assigned',
          'success'
        )
      })
      
    }

    }).then((x)=>{
     
    }).catch((reason)=>{
      //console.log(reason)
    }).finally(()=>{
      this.cancel=false;
    })
    setTimeout(()=>{
      
      //
    },2000);
  }

  deleteOne(id:any){
    this.pharmacyService.deletePhamasist(id).subscribe((res)=>{
      console.log("deleted");
      this.ngOnInit();
    })
  }
  logout(){

    this.auth.logout();
      }

x(){
  var data:any=[]
  this.tempdata.forEach(function(value:any) {

    if(value.subscription=='Active'){
      data.push(value);
    }
  });
  console.log(data);
  this.filterdData=data;
}
y(){
  var data:any=[]
  this.tempdata.forEach(function(value:any) {


      data.push(value);

  });
  console.log(data);
  this.filterdData=data;
}


sort(value:string){

}


Search(){
  if(this.name==""){
    this.filterdData=this.tempdata;
  }else{
    this.filterdData=this.tempdata.filter(res=>{
      return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
    })
  }
}



}
