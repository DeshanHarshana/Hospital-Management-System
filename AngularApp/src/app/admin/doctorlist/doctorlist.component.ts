import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {

  data:any=[];
  constructor(
    private doctorService:DoctorService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.doctorService.getAllDoctors().subscribe(
        res=>{
          this.data=res;
        }
      )
  });
  }


}
