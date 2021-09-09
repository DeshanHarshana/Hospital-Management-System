import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-patient-edit-profile',
  templateUrl: './patient-edit-profile.component.html',
  styleUrls: ['./patient-edit-profile.component.css']
})
export class PatientEditProfileComponent implements OnInit {
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
    weight:new FormControl(''),
    gurdian:new FormControl(''),
    height:new FormControl(''),
    healthAdditional:new FormControl(''),
    displayImage:new FormControl(''),
    bloodsurger:new FormControl(''),
    bloodpresure:new FormControl(''),
    cholestrol:new FormControl(''),
    type:new FormControl(''),



  })
  imageData:string='';
  oldimage:string='';
  imagename:string="";
  image:any;
  isImageselected:boolean=false;
  data:any=[];
  constructor(
    private doctorService:DoctorService,
    public toastr:ToastrService,
    public router:Router,
    public route:ActivatedRoute,
    private auth:AuthenticationService

  ) { }

  logout(){

    this.auth.logout();
      }

  ngOnInit(): void {


  }


  addDoctor(doctor:any){
    if(this.isImageselected){

      this.doctorService.updateDoctor(doctor, this.route.snapshot.params.id).subscribe(res=>{
          this.toastr.success("Update Successfully", "Updating Doctor");

          this.uploadImage(this.route.snapshot.params.id);
          setTimeout(()=>{
            this.router.navigate(['Admin-dashboard']);
          });




      });


    }else{
      doctor.displayName=this.oldimage;
      this.doctorService.updateDoctor(doctor, this.route.snapshot.params.id).subscribe(res=>{
          this.toastr.success("Update Successfully", "Updating Doctor");


          this.router.navigate(['Admin-dashboard']);



      });
    }





  }
  removeDoctor(value:any){
    const c = this.data._id;
    this.doctorService.deleteDoctor(c).subscribe(res=>{
      this.toastr.success("Deleting Successfully", "Delete Doctor");

      this.router.navigate(['Admin-dashboard']);
    })
  }
  toast(message:String) {
    this.toastr.warning(message.toString(), "Adding Doctor");
   }

  onFileSelect(event : Event){
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.image=file;

    const allowedFileTypes=["image/png", "image/jpeg", "image/jpg"];
    if(this.image && allowedFileTypes.includes(this.image.type)){
      const reader=new FileReader();
      reader.onload = () => {
        this.imageData=reader.result as string;
        this.imagename=this.image.name;
        console.log(this.imagename)
        if(file){
          this.isImageselected=true;
          }
          console.log("has image " + this.isImageselected)

      }
      reader.readAsDataURL(this.image);
    }
  }


  uploadImage(id:string){

    let fd=new FormData();
    if(this.image){
      fd.append("doctorImage", this.image, this.image.name);
      console.log(this.oldimage)
      this.doctorService.updateImage(id,fd).subscribe((res)=>{
        console.log(res);

      })
    }
  }
}
