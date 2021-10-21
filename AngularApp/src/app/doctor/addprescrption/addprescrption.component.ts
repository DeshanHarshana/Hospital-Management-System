import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Methods } from 'src/app/appdata/methods';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { DrugService } from 'src/app/services/drug.service';
import { PatientService } from 'src/app/services/patient.service';
import { PrescriptionService } from 'src/app/services/prescription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addprescrption',
  templateUrl: './addprescrption.component.html',
  styleUrls: ['./addprescrption.component.css'],
  providers : [Methods]
})
export class AddprescrptionComponent implements OnInit {
  productForm=new FormGroup({});
  patientName:string="";
  doctorName:string="";
  name:any="";
  drugList:any=[];
  drugname="";
  drugprice=0;
  medicineList=[];
  tempDruglist=[
    {
      "id": 0,
      "drugname": "Abacavir Sulfate",
      "price": 61,
      "description": ""
    }, {
      "id": 1,
      "drugname": "Abatacept",
      "price": 20,
      "description": ""
    }, {
      "id": 2,
      "drugname": "Abilify",
      "price": 84,
      "description": ""
    }
  ];
  constructor(
    private auth: AuthenticationService,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private patient:PatientService,
    private doctor:DoctorService,
    private method:Methods,
    private prescription:PrescriptionService,
    private toast:ToastrService,
    private router:Router,
    private drug:DrugService


  ) {

    this.productForm = this.fb.group({
      patientid:this.route.snapshot.params.id,
      doctorid:localStorage.getItem('doctorid'),
      date:new Date(Date.now()).toLocaleString(),
      patientname:new FormControl(''),
      doctorname:new FormControl(''),
      medicine: this.fb.array([]) ,
    });
   }
   medicine() : FormArray {
    return this.productForm.get("medicine") as FormArray
  }

  newQuantity(): FormGroup {

    return this.fb.group({
      drugname: this.drugname,
      quantity: 0,
      priceofone:this.drugprice,
      howtouse:''
    })
  }
  addMedicine() {
    this.medicine().push(this.newQuantity());
  }

  removeMedicine(i:number) {
    this.medicine().removeAt(i);
  }

  onSubmit() {
    console.log(this.productForm.value);
    this.prescription.addPrescription(this.productForm.value).subscribe(res=>{
      this.toast.success("Prescrpiton Added")
      this.router.navigate(['Admin-show-patient-details/'+this.route.snapshot.params.id])
    })


  }
  checkTotal(){
    console.log(this.productForm.value.medicine)
    this.medicineList=this.productForm.value.medicine;
    let total=0;
    this.medicineList.forEach((value, index)=>{
     total=total+(value['priceofone']*value['quantity'])
    })
    Swal.fire("Total : Rs " + total)

  }
  drugChange(event:any){
   this.findData(event.target.value)
  }

  findData(value:number){
    let name = this.tempDruglist.find(el => el.id == value);
    console.log(name?.drugname)
    this.drugname=name?.drugname!
    this.drugprice=name?.price!
    this.addMedicine()
  }

  ngOnInit(): void {
    var doctorid=localStorage.getItem('doctorid') || "";
    setTimeout(()=>{
      this.patient.getonePatient(this.route.snapshot.params.id).subscribe((res)=>{
        this.productForm.get('patientname')?.setValue(res.name)

      });
      this.doctor.getoneDoctor(doctorid).subscribe((res)=>{
        this.productForm.get('doctorname')?.setValue(res.fullname)

      });
      this.drug.allDrugs().subscribe(res=>{
        this.tempDruglist=res;
        console.log(this.drugList);
      })

    })

  }
  logout() {
    this.auth.logout();
  }

}
