
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AdminService } from 'src/app/services/admin.service';
import { Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,} from '@angular/core';
  import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
  } from 'date-fns';

  import { Subject } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
  } from 'angular-calendar';
import { AppoinmentService } from 'src/app/services/appoinment.service';
import { DoctorService } from 'src/app/services/doctor.service';

  const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };
@Component({
  selector: 'app-doctor-calendar',
  templateUrl: './doctor-calendar.component.html',
  styleUrls: ['./doctor-calendar.component.css']
})
export class DoctorCalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  displayImage="";
  doctordata:any=[];
  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;


  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [

  ];

  activeDayIsOpen: boolean = true;
  admindata:any=[];
  appoinments:any=[

  ];
  currentDoctor:string=""
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private admin:AdminService,
    private appoinment:AppoinmentService,
    private doctorService:DoctorService
    ) {

    }
  ngOnInit(): void {
    this.currentDoctor=String(localStorage.getItem('doctorid') || '');
setTimeout(()=>{
  this.admin.getAdmin().subscribe(res=>{
    this.admindata=res;
    console.log(res);
  });
});
setTimeout(()=>{
  this.currentDoctor=String(localStorage.getItem('doctorid') || '');

  this.doctorService.getoneDoctor(this.currentDoctor).subscribe(res=>{
    this.doctordata=res;
    this.displayImage=this.doctordata.displayImage;
  })
  this.appoinment.getDoctorAppoinments(this.currentDoctor).subscribe(res=>{

    res.forEach((element: any) => {
      this.events.push({
        start: startOfDay(new Date(element.appoinmentDate)),
        title: element.firstname + ' Appoinment ',
        color: colors.blue,
      })
      this.refresh.next();
    });
  }

  )
  this.activeDayIsOpen = false;
});


  }


  logout(){

    this.auth.logout();
      }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }




  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
