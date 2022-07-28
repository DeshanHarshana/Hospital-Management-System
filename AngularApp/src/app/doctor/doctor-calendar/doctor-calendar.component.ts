
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AdminService } from 'src/app/services/admin.service';
import { Component,
  ViewChild,
  TemplateRef,
  OnInit,} from '@angular/core';
  import {
    startOfDay,
    isSameDay,
    isSameMonth,
  } from 'date-fns';

  import { Subject } from 'rxjs';

  import {
    CalendarEvent,
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
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
  appoinments:any=[

  ];
  currentDoctor:string=""
  constructor(
    private auth:AuthenticationService,
    private admin:AdminService,
    private appoinment:AppoinmentService,
    private doctorService:DoctorService
    ) {
      setInterval(() => {
        this.time = new Date();
     }, 1000);
     this.decide();

    }
    decide() {
      this.hours = new Date().getHours();
      console.log("this.hours",this.hours)
      if(this.hours < 10){
        this.msg = "Good Morning"
        this.link = "wwww.google.com"
        console.log("selamat Pagi")
      }else if(this.hours < 16){
        this.msg = "Good Afternoon"
        this.link = "wwww.tokopedia.com"
        console.log("selamat siang")
      }else if(this.hours < 19){
        this.msg = "Good Evening"
      }else if(this.hours < 24){
        this.msg = "Good Night"
        this.link = "wwww.sprout.co.id"
        console.log("selamat malam")
      }else if(this.hours < 6){
        this.msg = "Sleep lah"
        this.link = "www.mangabat.com"
        console.log("selamat subuh")
      }
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
      console.log(element.appoinmentDate)
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
