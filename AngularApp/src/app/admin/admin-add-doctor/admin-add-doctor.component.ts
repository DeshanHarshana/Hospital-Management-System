import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-add-doctor',
  templateUrl: './admin-add-doctor.component.html',
  styleUrls: ['./admin-add-doctor.component.css']
})
export class AdminAddDoctorComponent implements OnInit {
  doctor=new FormGroup({

  })
  imageData:string='';
  constructor() { }

  ngOnInit(): void {
    this.imageData="../../../assets/add-doctor/nopic.png";
  }


  onFileSelect(event : Event){
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const allowedFileTypes=["image/png", "image/jpeg", "image/jpg"];
    if(file && allowedFileTypes.includes(file.type)){
      const reader=new FileReader();
      reader.onload = () => {
        this.imageData=reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }
}
