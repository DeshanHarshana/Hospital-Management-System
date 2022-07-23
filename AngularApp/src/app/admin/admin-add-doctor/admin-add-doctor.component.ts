import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/loader/loader.service';
import { AdminService } from 'src/app/services/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PharmacistService } from 'src/app/services/pharmacist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-add-doctor',
  templateUrl: './admin-add-doctor.component.html',
  styleUrls: ['./admin-add-doctor.component.css']
})
export class AdminAddDoctorComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);

  admindata:any=[]
  doctor=new FormGroup({
    title:new FormControl(''),
    fullname:new FormControl(''),
    email:new FormControl(''),
    phone:new FormControl(''),
    age:new FormControl(''),
    currentCity:new FormControl(''),
    currentHospital:new FormControl(''),
    maritalStatus:new FormControl(''),
    personalAdditional:new FormControl(''),
    degree:new FormControl(''),

    edulevel:new FormControl(''),
    eduAdditional:new FormControl(''),
    displayImage:new FormControl(''),
    SLMC:new FormControl(''),
    experiance:new FormControl(''),
    position:new FormControl(''),
    type:new FormControl(''),


  })
  imageData:string='';
  image:any;
  cancel:boolean=false;
  isImageselected:boolean=false;
  constructor(
    private doctorService:DoctorService,
    public toastr:ToastrService,
    public router:Router,
    private admin:AdminService,
    public loaderService:LoaderService,
    private auth:AuthenticationService,
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

  logout(){

this.auth.logout();
  }

  ngOnInit(): void {
    this.isImageselected=false;
    this.imageData="../../../assets/add-doctor/nopic.png";
    setTimeout(()=>{
      this.admin.getAdmin().subscribe(res=>{
        this.admindata=res;
      });
    })
  }


  addDoctor(doctor:any){
    doctor.displayImage="";
    console.log(doctor);
    if(!this.isImageselected){
      this.toastr.warning("Select Image", "Before Adding Doctor");
    }else{


    this.doctorService.addDoctor(doctor).subscribe(res=>{
      if(res.exist=="yes"){
        this.toast('You added this doctor already')
      }
      else{
        this.toastr.success(res.message.toString(), "Adding Doctor");
        console.log(res.id);
        this.uploadImage(res.id);
        this.router.navigate(['Admin-Add-Doctor']);
    this.doctor.get('title')?.setValue('');
    this.doctor.get('fullname')?.setValue('');
    this.doctor.get('email')?.setValue('');
    this.doctor.get('phone')?.setValue('');
    this.doctor.get('age')?.setValue('');
    this.doctor.get('currentCity')?.setValue('');
    this.doctor.get('currentHospital')?.setValue('');
    this.doctor.get('maritalStatus')?.setValue('');
    this.doctor.get('personalAdditional')?.setValue('');
    this.doctor.get('degree')?.setValue('');
    this.doctor.get('edulevel')?.setValue('');
    this.doctor.get('eduAdditional')?.setValue('');
    this.doctor.get('displayImage')?.setValue('');
    this.doctor.get('SLMC')?.setValue('');
    this.doctor.get('experiance')?.setValue('');
    this.doctor.get('position')?.setValue('');
    this.doctor.get('type')?.setValue('');
    this.imageData="../../../assets/add-doctor/nopic.png";
    this.image=null
    this.isImageselected=false;


      }
    })

  }
  }
  toast(message:String) {
    this.toastr.warning(message.toString(), "Adding Doctor");
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
 

  onFileSelect(event : Event){
    
    
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.image=file;
    this.isImageselected=true;
    console.log("sds")
    const allowedFileTypes=["image/png", "image/jpeg", "image/jpg"];
    if(this.image && allowedFileTypes.includes(this.image.type)){
      const reader=new FileReader();
      reader.onload = () => {
        this.imageData=reader.result as string;
      }
      reader.readAsDataURL(this.image);
    }
  }


  uploadImage(id:string){

    let fd=new FormData();
    if(this.image){
      fd.append("doctorImage", this.image, this.image.name);

      this.doctorService.doctorImage(id,fd).subscribe((res)=>{
        console.log(res);

      })
    }
  }
}
