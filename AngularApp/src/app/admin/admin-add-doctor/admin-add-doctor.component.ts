import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
    type:new FormControl('')

  })
  imageData:string='';
  constructor(
    private doctorService:DoctorService,
    public toastr:ToastrService,
  ) { }

  ngOnInit(): void {
    this.imageData="../../../assets/add-doctor/nopic.png";
  }

  addDoctor(doctor:any){
    doctor.displayImage=this.imageData;
    console.log(doctor);

    this.doctorService.addDoctor(doctor).subscribe(res=>{
      if(res.exist=="yes"){
        this.toast('You added this doctor already')
      }
      else{
        this.toastr.success(res.message.toString(), "Adding Doctor");
      }
    })
  }

  toast(message:String) {
    this.toastr.warning(message.toString(), "Adding Doctor");
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
