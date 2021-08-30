import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {
  main:boolean=false;
  data:any=[];
  constructor(
    private doctorService:DoctorService,
    private router:Router,
    private route:ActivatedRoute
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
  testroute(){
    this.main=true;
this.router.navigate(['Admin-edit-doctor-details/2'], {relativeTo:this.route})
  }

}
