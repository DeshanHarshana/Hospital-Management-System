import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-show-doctor-details',
  templateUrl: './show-doctor-details.component.html',
  styleUrls: ['./show-doctor-details.component.css']
})
export class ShowDoctorDetailsComponent implements OnInit {
  data:any=[];
  id:string=""
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private doctorService:DoctorService
  ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params.id;
    this.doctorService.getoneDoctor(this.id).subscribe((res)=>{
      this.data=res;
    })
  }
  logout(){
    localStorage.removeItem('access');
    this.router.navigate(['/']);
  }
}
