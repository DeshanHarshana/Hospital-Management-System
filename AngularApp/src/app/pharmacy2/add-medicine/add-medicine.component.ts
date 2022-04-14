import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DrugService } from 'src/app/services/drug.service';
import { Drug } from 'src/app/appdata/Drug';
import { PharmacistService } from 'src/app/services/pharmacist.service';




@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {
  name:string="";
  num = [1, 2, 3];
  tempdata:Drug[]=[]
  drugData:any;
  selectedDrugdata:any = [];
  firstTime : boolean = true;
  inEdit : boolean = true;
  currentDrug: string = '';
  isEditChange : boolean = false;
  isAddChange : boolean = false;
  drugId :number = 0;
  editForm = new FormGroup({
    drugname : new FormControl(''),
    price : new FormControl(''),
    description : new FormControl('')
  })
  addForm = new FormGroup({
    id : new FormControl({value: 0, disabled: true}),
    drugname : new FormControl(''),
    price : new FormControl(''),
    description : new FormControl('')
  })


  constructor(
    public toastr: ToastrService,
    public router: Router,
    public route: ActivatedRoute,
    private auth: AuthenticationService,
    private drugService: DrugService,
    private pharmasisit:PharmacistService


  ) { }

  ngOnInit(): void {
 
  
    setTimeout(() => {
      this.drugService.allDrugs().subscribe(res=>{
        this.tempdata=res;
        console.log(this.getMax());
        this.addForm.get('id')?.setValue(this.getMax()+1);
        this.drugId = this.getMax()+1;
            });
    }, );
    this.pharmasisit.getPharmacist(localStorage.getItem("pharmacistid")||" ").subscribe(res=>{
      this.name=res.name;
      //console.log(res);
    })

  }

  updateDrug(event:any){

    this.drugService.updateDrug(this.editForm.value, this.currentDrug).subscribe(res=>{
      console.log(res);
      this.toast("Updating Drug Successfully")
      this.router.navigate(['show-medicine']);
     
    })
   
   
  }

  addNewDrug(event:any){
    console.log(this.addForm.valid)
    if(this.addForm.valid)
    {
      this.addForm.value['id'] = this.drugId;
      console.log(this.addForm.value);
      this.drugService.addNewDrug(this.addForm.value).subscribe(res=>{
        console.log(res);
        this.toastr.warning( "Adding Succesfull", "Added");
        this.router.navigate(['show-medicine']);
        
      })
    }
   
  }
  toast(message:String) {
    this.toastr.warning(message.toString(), "Updating Drug");
   }
  logout() {

    this.auth.logout();
  }
  getMedicine(event: any) {
    this.firstTime = false;
    console.log(event.target.value);
    var x = this.tempdata.find(x => (x.drugname == event.target.value))
    console.log(x);
    this.selectedDrugdata = x;
    this.editForm.get('drugname')?.setValue(x?.drugname)
    this.editForm.get('price')?.setValue(x?.price)
    this.editForm.get('description')?.setValue(x?.description)
    this.currentDrug = x?._id!
    this.isEditChange = true;

    

  }
  getMax()
  {
    var max = 0;
    this.tempdata.forEach((value, index)=>{
      if(value.id >= max ){
        max = value.id;
      }
    })
   return max;
  }
 

}
