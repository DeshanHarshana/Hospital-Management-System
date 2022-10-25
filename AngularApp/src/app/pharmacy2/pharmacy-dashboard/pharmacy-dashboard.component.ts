import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Drug } from 'src/app/appdata/Drug';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DrugService } from 'src/app/services/drug.service';
import { PharmacistService } from 'src/app/services/pharmacist.service';


@Component({
  selector: 'app-pharmacy-dashboard',
  templateUrl: './pharmacy-dashboard.component.html',
  styleUrls: ['./pharmacy-dashboard.component.css']
})
export class PharmacyDashboardComponent implements OnInit {
  name:string="";
  tempdata:Drug[]=[]
  inChild: boolean = true
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
  prescriptionData:any=[];
  patientid:string="";
  patientname:string="";
  displayImage:string="";
  patient_id : string = '';
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private drugService:DrugService, 
    private pharmasisit:PharmacistService

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
      this.drugService.allDrugs().subscribe(res=>{
        this.tempdata=res;
        console.log(this.tempdata);
      });


    }, );
    this.pharmasisit.getPharmacist(localStorage.getItem("pharmacistid")||" ").subscribe(res=>{
      this.name=res.name;
      //console.log(res);
    })
  }

  logout(){

    this.auth.logout();
      }
  clickList1(){
    this.inChild = false;
    this.router.navigate(['pharmacy-home/show-medicine']);
      }
   clickList2(){
        this.inChild = false;
        this.router.navigate(['pharmacy-home/add-drug']);
          }
      
  
    
  
    
    
}
