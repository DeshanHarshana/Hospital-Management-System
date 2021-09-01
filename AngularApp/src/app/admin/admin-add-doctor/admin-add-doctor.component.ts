import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/loader/loader.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-admin-add-doctor',
  templateUrl: './admin-add-doctor.component.html',
  styleUrls: ['./admin-add-doctor.component.css']
})
export class AdminAddDoctorComponent implements OnInit {
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
  isImageselected:boolean=false;
  constructor(
    private doctorService:DoctorService,
    public toastr:ToastrService,
    public router:Router,
    public loaderService:LoaderService,

  ) { }

  logout(){
    localStorage.removeItem('access');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.isImageselected=false;
    this.imageData="../../../assets/add-doctor/nopic.png";
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

  onFileSelect(event : Event){
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.image=file;
    this.isImageselected=true;
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
