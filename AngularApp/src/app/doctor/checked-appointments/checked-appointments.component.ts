import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-checked-appointments',
  templateUrl: './checked-appointments.component.html',
  styleUrls: ['./checked-appointments.component.css']
})
export class CheckedAppointmentsComponent implements OnInit {
  data:any=[]

  currentPatient: any;
  constructor(
    private router: Router,
    private auth: AuthenticationService,

    private notification:NotificationService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.notification.getSpecificNotofication(this.route.snapshot.params.id).subscribe((res)=>{
        this.data=res


      })
  })}
  logout() {
    this.auth.logout();
  }

  content(id:string){
    this.notification.seen(id).subscribe((res)=>{});
    this.router.navigate(['DoctorAppoinmentList'])
  }
}
