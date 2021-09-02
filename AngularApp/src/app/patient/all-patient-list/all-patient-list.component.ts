import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/appdata/Patient';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-patient-list',
  templateUrl: './all-patient-list.component.html',
  styleUrls: ['./all-patient-list.component.css']
})
export class AllPatientListComponent implements OnInit {
  p:number=1;
  tempdata:Patient[]=Patient.data;
  filterdData:any=[];
  name:any;
  constructor(
    private router:Router,

  ) { }

  ngOnInit(): void {
    this.filterdData=this.tempdata;
  }
logout(){
    localStorage.removeItem('access');
    this.router.navigate(['/']);
  }
x(){
  var data:any=[]
  this.tempdata.forEach(function(value:any) {

    if(value.subscription=='Active'){
      data.push(value);
    }
  });
  console.log(data);
  this.filterdData=data;
}
y(){
  var data:any=[]
  this.tempdata.forEach(function(value:any) {


      data.push(value);

  });
  console.log(data);
  this.filterdData=data;
}


sort(value:string){

}


Search(){
  if(this.name==""){
    this.filterdData=this.tempdata;
  }else{
    this.filterdData=this.tempdata.filter(res=>{
      return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase())
    })
  }
}





}
