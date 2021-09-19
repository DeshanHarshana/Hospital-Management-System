
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
  selector: 'app-calender',

  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],

})
export class CalenderComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

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
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private admin:AdminService,
    private appoinment:AppoinmentService
    ) {

    }
  ngOnInit(): void {
setTimeout(()=>{
  this.admin.getAdmin().subscribe(res=>{
    this.admindata=res;
    console.log(res);
  });
});
setTimeout(()=>{
  this.appoinment.getDoctorAppoinments("61459d75e8e41345840a7a5d").subscribe(res=>{

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
