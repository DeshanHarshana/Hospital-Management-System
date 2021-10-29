import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DrugService } from 'src/app/services/drug.service';
import { Drug } from 'src/app/appdata/Drug';




@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {

  tempdata:Drug[]=[]
  drugData:any;
  selectedDrugdata:any = [];
  firstTime : boolean = true;
  inEdit : boolean = true;
  currentDrug: string = '';
  isEditChange : boolean = false;
  isAddChange : boolean = false;
  editForm = new FormGroup({
    drugname : new FormControl(''),
    price : new FormControl(''),
    description : new FormControl('')
  })
  addForm = new FormGroup({
    drugID : new FormControl(''),
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


  ) { }

  ngOnInit(): void {
 
    // setTimeout(() => {

    //   this.drugService.getSingleDrug(this.currentDrug).subscribe(res=>{
    //     this.currentDrug = res.id;
    //     this.drug.get('drugname')?.setValue(res.drugname);
    //     this.drug.get('price')?.setValue(res.price);
    //     this.drug.get('des')?.setValue(res.description);



    //   })

    // }, 2);
    //get the drug one by one
    setTimeout(() => {
      this.drugService.allDrugs().subscribe(res=>{
        this.tempdata=res;
        console.log(this.tempdata);
      });
    }, );

  }

  updateDrug(event:any){

    this.drugService.updateDrug(this.editForm.value, this.currentDrug).subscribe(res=>{
      console.log(res);
      this.toast("Updating Drug Successfull")
      this.router.navigate(['show-medicine']);
     
    })
   
  }

  addNewDrug(event:any){
    this.drugService.addNewDrug(this.addForm.value).subscribe(res=>{
      console.log(res);
      this.toast("Adding Drug Successfully!")
      this.router.navigate(['show-medicine']);
      
    })
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

}
