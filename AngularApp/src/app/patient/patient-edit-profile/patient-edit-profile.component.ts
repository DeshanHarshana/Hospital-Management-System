import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
    currentCity:new FormControl(''),
    currentHospital:new FormControl(''),
    maritalStatus:new FormControl(''),
    personalAdditional:new FormControl(''),
    degree:new FormControl(''),

    edulevel:new FormControl(''),
    eduAdditional:new FormControl(''),
    displayImage:new FormControl(''),
    SLMC:new FormControl(''),
    ex:new FormControl(''),
    position:new FormControl(''),
    type:new FormControl(''),


  })
  imageData:string='';
  oldimage:string='';
  imagename:string="";
  image:any;
  isImageselected:boolean=false;
  data:any=[];
  constructor(
    private auth:AuthenticationService
  ) { }

  ngOnInit(): void {
  }
  logout(){

    this.auth.logout();
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
}
