import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-edit-profile',
  templateUrl: './patient-edit-profile.component.html',
  styleUrls: ['./patient-edit-profile.component.css']
})
export class PatientEditProfileComponent implements OnInit {
  patient=new FormGroup({
    title:new FormControl(''),
    fullname:new FormControl(''),
    email:new FormControl(''),
    phone:new FormControl(''),
    age:new FormControl(''),
    city:new FormControl(''),
    disease:new FormControl(''),
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
    gender:new FormControl(''),
    wardno:new FormControl(''),
    subscription:new FormControl(false),
    nic:new FormControl('')




  })
  imageData:string='';
  oldimage:string='';
  imagename:string="";
  image:any;
  isImageselected:boolean=false;
  data:any=[];
  constructor(
    private patientService:PatientService,
    public toastr:ToastrService,
    public router:Router,
    public route:ActivatedRoute,
    private auth:AuthenticationService

  ) { }

  logout(){

    this.auth.logout();
      }

  ngOnInit(): void {
    this.isImageselected=false;
    this.imageData="../../../assets/add-doctor/nopic.png";
    setTimeout(()=>{
      this.patientService.getonePatient(this.route.snapshot.params.id).subscribe(
        res=>{
          this.data=res;
          this.imageData=res.displayImage;
          this.oldimage=res.displayImage;
          console.log(this.oldimage)
          console.log(res.displayImage)
          this.patient.get('title')?.setValue(res.title);
          this.patient.get('fullname')?.setValue(res.name);
          this.patient.get('email')?.setValue(res.email);
          this.patient.get('phone')?.setValue(res.phone);
          this.patient.get('age')?.setValue(res.age);
          this.patient.get('city')?.setValue(res.city);
          this.patient.get('disease')?.setValue(res.disease);
          this.patient.get('maritalStatus')?.setValue(res.maritalStatus);
          this.patient.get('age')?.setValue(res.age);
          this.patient.get('age')?.setValue(res.age);
          this.patient.get('age')?.setValue(res.age);

        })
      })

  }


  editpatient(patient:any){
    if(this.isImageselected){

      this.patientService.updatePatient(patient, this.route.snapshot.params.id).subscribe(res=>{
          this.toastr.success("Update Successfully", "Updating Doctor");

          this.uploadImage(this.route.snapshot.params.id);
          setTimeout(()=>{
            this.router.navigate(['Admin-dashboard']);
          });




      });


    }else{
      patient.displayImage=this.oldimage;
      this.patientService.updatePatient(patient, this.route.snapshot.params.id).subscribe(res=>{
          this.toastr.success("Update Successfully", "Updating Doctor");


          this.router.navigate(['Admin-dashboard']);



      });
    }





  }
  removepatient(value:any){
    const c = this.data._id;
    this.patientService.deletePatient(c).subscribe(res=>{
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
      fd.append("patientImage", this.image, this.image.name);
      console.log(this.oldimage)
      this.patientService.updateImage(id,fd).subscribe((res)=>{
        console.log(res);

      })
    }
  }





  Click(value:any){
    console.log(this.patient.get('subscription')?.value)
  }
}
