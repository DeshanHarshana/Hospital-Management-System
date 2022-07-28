import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { Methods } from 'src/app/appdata/methods';
import { Patient } from 'src/app/appdata/Patient';
@Component({
  selector: 'app-show-doctor-details',
  templateUrl: './show-doctor-details.component.html',
  styleUrls: ['./show-doctor-details.component.css'],
  providers : [Methods]
})
export class ShowDoctorDetailsComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  
  data:any=[];
  patientList:any=[];
  id:string="";
  
  ward=0;
  patient=0;
  displayImage="";
  doctordata:any=[];
  cancel:boolean=false;
  currentDoctor="";
  today = new Date().toISOString().slice(0, 10);
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private doctorService:DoctorService,
    private auth:AuthenticationService,
    private method:Methods,
    private doctor:DoctorService


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
    setTimeout(() => {
      this.currentDoctor=String(localStorage.getItem('doctorid') || '');

      this.doctor.getoneDoctor(this.currentDoctor).subscribe(res=>{
        this.doctordata=res;
        this.displayImage=this.doctordata.displayImage;
      })
      this.id=this.route.snapshot.params.id;
      this.doctorService.getoneDoctor(this.id).subscribe((res)=>{
        this.data=res;
        console.log(this.data);
        this.ward= this.method.doctorWard(this.data.type);
        this.patient=Object.keys(this.data.patient).length;
        //console.log(this.ward);
      });


    });
    setTimeout(()=>{
      this.doctorService.getPatientList(this.id).subscribe((res)=>{
        var list = Object.values(res);

        for(var i=0; i<Object.keys(res).length; i++){
          this.patientList.push(list[i])
        }
        //console.log(this.patientList);



      });


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
    localStorage.removeItem('access');
    this.router.navigate(['/']);
  }
  AllPatient(){
    
    this.router.navigate(["DoctorPatientList/"+this.route.snapshot.params.id])
  }
}
