import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {NgxPrintModule} from 'ngx-print';
import { PatientService } from 'src/app/services/patient.service';
import { Doctor } from 'src/app/appdata/Doctor';
@Component({
  selector: 'app-patient-bill',
  templateUrl: './patient-bill.component.html',
  styleUrls: ['./patient-bill.component.css']
})
export class PatientBillComponent implements OnInit {
  patient_id : string = '';
  patientData:any=[]
  patientDoctors:Doctor[]=[]
  medicine:any[]=[];
  medicineList:any[]=[];
  doctorTotal:number=0;
  otherButton:boolean=true;
  patientname:string="";
  displayImage:string="";
  src="./signature.jpeg";

  total:number=0;
  todayDate = new Date().toISOString().slice(0, 10);
  @ViewChild('myDiv') myDiv!: ElementRef;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private patient:PatientService

  ) { }

  ngOnInit(): void {
    const access=localStorage.getItem('access');
    if(!(access=="patient")){
      this.otherButton=false;
    }
    this.patient_id = localStorage.getItem('patientid') || '';
    console.log(this.patient_id);
setTimeout(()=>{
  this.patient.getonePatient(this.patient_id).subscribe((res)=>{
    this.patientData=res;
  });
  this.patient.getAlldoctorsList(this.patient_id).subscribe(res=>{
    this.patientDoctors=res
    this.patientDoctors.forEach((value,index)=>{
      this.doctorTotal=this.doctorTotal+1200;
    })
  });
  this.patient.getAllmedicinelist(this.patient_id).subscribe(res=>{
   this.medicine=res;
   this.calculate(res)

  })

})
this.patient_id = localStorage.getItem('patientid') || '';
console.log(this.patient_id);

this.patient.getonePatient(this.patient_id).subscribe(res=>{
  this.patientname=res.name;
  this.displayImage=res.displayImage;
})

  }

  calculate(list:any[]){
    this.addtoList(list).then((res)=>{
      this.medicineList=<any>res
      this.medicineList.forEach((value, index)=>{
        this.total=this.total+(value.quantity * value.priceofone);
      })
    })
  }

  addtoList(list:any[]){
    return new Promise((res,rej)=>{
      var data:any[]=[];
      setTimeout(()=>{
        list.forEach((value,index)=>{
          data = [...data, ...value.medicine]
        })
        res(data)
      },30)
    })
  }
  goHome(){
    const access=localStorage.getItem('access')
    console.log(access);
    if(access=="admin"){
      this.router.navigate(['Admin-dashboard'])
    }else if(access=='doctor'){
      this.router.navigate(['Doctor-dashboard'])
    }else if(access=='patient'){
      this.router.navigate(['Patient-dashboard'])
    }else{
      this.router.navigate(['/']);
    }
  }


  logout(){

    this.auth.logout();
      }
      printDiv(){
        var printContents = this.myDiv.nativeElement.innerHTML
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
        window.location.reload()

      }

      WithoutTime(dateTime:any) {
        var date = new Date(dateTime.getTime());
        date.setHours(0, 0, 0, 0);
        return date;
    }
}
