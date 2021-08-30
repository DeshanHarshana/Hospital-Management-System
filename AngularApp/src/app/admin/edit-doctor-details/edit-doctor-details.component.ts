import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-edit-doctor-details',
  templateUrl: './edit-doctor-details.component.html',
  styleUrls: ['./edit-doctor-details.component.css']
})
export class EditDoctorDetailsComponent implements OnInit {
  doctor=new FormGroup({

  });
  imageData:string='';
  image:any;
  isImageselected:boolean=false;
  test=""
  constructor(
    private doctorService:DoctorService,
    public toastr:ToastrService,
    public router:Router,
    public route:ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.test=this.route.snapshot.params.id
    this.isImageselected=false;
    this.imageData="../../../assets/add-doctor/nopic.png";


  }

  editDoctor(data:any){

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

  gotoMain(){
    this.router.navigate(['Admin-dashboard'])

  }
}
