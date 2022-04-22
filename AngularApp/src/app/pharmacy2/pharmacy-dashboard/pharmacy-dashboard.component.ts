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
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private drugService:DrugService, 
    private pharmasisit:PharmacistService

  ) { }

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
