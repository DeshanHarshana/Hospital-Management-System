import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Drug } from 'src/app/appdata/Drug';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DrugService } from 'src/app/services/drug.service';

@Component({
  selector: 'app-show-medicine',
  templateUrl: './show-medicine.component.html',
  styleUrls: ['./show-medicine.component.css']
})
export class ShowMedicineComponent implements OnInit {
  tempdata:Drug[]=[]
  drugData:any;
  selectedDrugdata:any = [];
  firstTime : boolean = true;
  inEdit : boolean = true;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private drugService:DrugService, 
  ) { }

  ngOnInit(): void {
    //this.selectedDrugdata=this.route.snapshot.params.id;

    setTimeout(() => {
      this.drugService.allDrugs().subscribe(res=>{
        this.tempdata=res;
        console.log(this.tempdata);
      });


    }, );
  }
  getMedicine(event:any){
    this.firstTime = false;
    console.log(event.target.value);
    var x=this.tempdata.find(x=>(x.drugname == event.target.value))
    console.log(x);
    this.selectedDrugdata = x;
 
  }

  clickEdit(){
    this.inEdit = false;
  }
  logout(){

    this.auth.logout();
      }
}
