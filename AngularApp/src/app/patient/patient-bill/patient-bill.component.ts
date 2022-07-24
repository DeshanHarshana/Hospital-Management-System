import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {NgxPrintModule} from 'ngx-print';
import { PatientService } from 'src/app/services/patient.service';
import { Doctor } from 'src/app/appdata/Doctor';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-patient-bill',
  templateUrl: './patient-bill.component.html',
  styleUrls: ['./patient-bill.component.css']
})
export class PatientBillComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
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
  prescriptionID:string="";
  adminSign:boolean=false;
  sign:boolean=false;
  canPrint:boolean=false;
  isAdmin:boolean=false;

  total:number=0;
  todayDate = new Date().toISOString().slice(0, 10);
  @ViewChild('myDiv') myDiv!: ElementRef;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private patient:PatientService,
    private prescription:PrescriptionService,
    public toastr:ToastrService,

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
    const access=localStorage.getItem('access');
    if(!(access=="patient")){
      this.otherButton=false;
      this.patient_id=this.route.snapshot.params.id;
      console.log(this.patient_id)
    }else{
      this.patient_id = localStorage.getItem('patientid') || '';
      console.log(this.patient_id);
    }
    
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
   this.prescriptionID=res.map(function(a:any) {return a._id;})[0]
   this.adminSign=res.map(function(a:any) {return a.adminSign;})[0];
   this.sign=res.map(function(a:any) {return a.adminSign;})[0];
   this.calculate(res)

   console.log("Admin sign " + res.map(function(a:any) {return a.adminSign;})[0]);
    
      if(this.adminSign==true){
        this.canPrint=true;
      }
      else{
        this.canPrint=false;
      }
    
  })

})


this.patient.getonePatient(this.patient_id).subscribe(res=>{
  this.patientname=res.name;
  this.displayImage=res.displayImage;
})

  }
  toast(message:String) {
    this.toastr.warning(message.toString(), "Change Signature");
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

  available(value:any){
    console.log(value.target.checked)
    this.sign=value.target.checked;
    var data={
      adminSign:value.target.checked
    }
    console.log(this.prescriptionID)
    this.prescription.changeAvalilability(this.prescriptionID, data).subscribe(res=>{
        
        if(res.adminSign){
          this.toast("Added Admin Sign");
          this.canPrint=true;
        }else{
          this.toast("Remove Admin Sign")

          this.canPrint=false;
        }
    })

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
