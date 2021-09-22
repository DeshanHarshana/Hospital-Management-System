import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-doctor-timetable',
  templateUrl: './doctor-timetable.component.html',
  styleUrls: ['./doctor-timetable.component.css']
})
export class DoctorTimetableComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }
}
