import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { Product } from 'src/app/appdata/Product';
import { PatientService } from 'src/app/services/patient.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {


  p:number=1;
  tempdata:Product[]=[]
  filterdData:any=[];
  name:any;



  catogory:any="All Category";
  constructor(
    private doctorService:DoctorService,
    private router:Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService,
    private productService:ProductService,
    public toastr:ToastrService
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.productService.getProducts().subscribe(res=>{
        this.tempdata=res;
        this.filterdData=this.tempdata;

      });


    }, );
  }


  logout(){

    this.auth.logout();
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

      Catogorize(){
        if(this.catogory=="All Category"){
          this.filterdData=this.tempdata;
        }else{
          this.filterdData=this.tempdata.filter(res=>{
            return res.category.toLocaleLowerCase().match(this.catogory.toLocaleLowerCase())
          })
        }
      }
}
