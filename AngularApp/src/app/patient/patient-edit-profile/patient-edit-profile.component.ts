import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-patient-edit-profile',
  templateUrl: './patient-edit-profile.component.html',
  styleUrls: ['./patient-edit-profile.component.css']
})
export class PatientEditProfileComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
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
    bloodsuger:new FormControl(''),
    bloodpresure:new FormControl(''),
    cholestrol:new FormControl(''),
    gender:new FormControl(''),
    wardno:new FormControl(1),
    subscription:new FormControl(false),
    nic:new FormControl('')




  })
  imageData:string='';
  oldimage:string='';
  imagename:string="";
  name:string="";
  image:any;
  isImageselected:boolean=false;
  data:any=[];
  currentid="";
  constructor(
    private patientService:PatientService,
    public toastr:ToastrService,
    public router:Router,
    public route:ActivatedRoute,
    private auth:AuthenticationService

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

    this.currentid=this.route.snapshot.params.id;
    console.log(this.route.snapshot.params)
    console.log(this.currentid);
    setTimeout(()=>{
      this.patientService.getonePatient(this.currentid).subscribe(
        res=>{
          this.data=res;
          this.imageData=res.displayImage;
          this.oldimage=res.displayImage;
          this.name=res.fullname;
          console.log(this.oldimage)
          console.log(res.displayImage)
          this.patient.get('title')?.setValue(res.title);
          this.patient.get('gender')?.setValue(res.gender);

          this.patient.get('fullname')?.setValue(res.name);
          this.patient.get('email')?.setValue(res.email);
          this.patient.get('phone')?.setValue(res.phone);
          this.patient.get('age')?.setValue(res.age);
          this.patient.get('city')?.setValue(res.city);
          this.patient.get('disease')?.setValue(res.disease);
          this.patient.get('maritalStatus')?.setValue(res.maritalStatus);
          this.patient.get('gurdian')?.setValue(res.gurdian);
          this.patient.get('weight')?.setValue(res.weight);
          this.patient.get('height')?.setValue(res.height);
          this.patient.get('healthAdditional')?.setValue(res.healthAdditional);
          this.patient.get('bloodsuger')?.setValue(res.bloodsuger);
          this.patient.get('bloodpresure')?.setValue(res.bloodpresure);
          this.patient.get('cholestrol')?.setValue(res.cholestrol);
          this.patient.get('wardno')?.setValue(res.wardno);
          this.patient.get('subscription')?.setValue(res.subscription);
          this.patient.get('nic')?.setValue(res.nic);
          this.patient.get('personalAdditional')?.setValue(res.personalAdditional);

        })
      })

  }

  goHome(){
    const access=localStorage.getItem('access')
    console.log(access);
    if(access=="admin"){
      this.router.navigate(['Admin-dashboard'])
    }else if(access=='doctor'){
      this.router.navigate(['Doctor-dashboard'])
    }else if(access=='patient'){
      this.router.navigate(['Patient-dashboard'])
    }else{
      this.router.navigate(['/']);
    }
  }
 

  editpatient(patient:any){
    if(this.isImageselected){

      this.patientService.updatePatient(patient, this.currentid).subscribe(res=>{
          this.toastr.success("Update Successfully", "Updating Patient");

          this.uploadImage(this.currentid);
          setTimeout(()=>{
            if(localStorage.getItem('access')=="admin"){
              this.router.navigate(['Admin-show-all-patient-list']);
            }
            else if(localStorage.getItem('access')=="doctor"){
              this.router.navigate(['DoctorPatientList/'+localStorage.getItem('doctorid')]);
            }
            else if(localStorage.getItem('access')=="patient"){
              this.router.navigate(['Patient-dashboard']);
            }

          });




      });


    }else{
      patient.displayImage=this.oldimage;
      this.patientService.updatePatient(patient, this.currentid).subscribe(res=>{
          this.toastr.success("Update Successfully", "Updating Patient");

          if(localStorage.getItem('access')=="admin"){
            this.router.navigate(['Admin-show-all-patient-list']);
          }
          else if(localStorage.getItem('access')=="doctor"){
            this.router.navigate(['DoctorPatientList/'+localStorage.getItem('doctorid')]);
          }
          else if(localStorage.getItem('access')=="patient"){
            this.router.navigate(['Patient-dashboard']);
          }


      });
    }





  }
  removepatient(value:any){
    const c = this.data._id;
    this.patientService.deletePatient(this.currentid).subscribe(res=>{
      this.toastr.success("Deleting Successfully", "Delete Patient");

      if(localStorage.getItem('access')=="admin"){
        this.router.navigate(['Admin-show-all-patient-list']);
      }
      else if(localStorage.getItem('access')=="doctor"){
        this.router.navigate(['DoctorPatientList/'+localStorage.getItem('doctorid')]);
      }
      else if(localStorage.getItem('access')=="patient"){
        this.router.navigate(['Patient-dashboard']);
      }
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
