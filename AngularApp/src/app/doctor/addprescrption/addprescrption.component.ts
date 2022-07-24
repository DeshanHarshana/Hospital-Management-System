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
import { faTrashAlt, faCheckCircle, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-addprescrption',
  templateUrl: './addprescrption.component.html',
  styleUrls: ['./addprescrption.component.css'],
  providers : [Methods]
})
export class AddprescrptionComponent implements OnInit {
  title = 'clock-greets';
  time:any;
  hours:any;
  msg:any;
  link:any;
  today = new Date().toISOString().slice(0, 10);
  faTrashAlt = faTrashAlt;
  faMoneyCheckAlt=faMoneyCheckAlt;
  faCheckCircle=faCheckCircle;
  productForm=new FormGroup({});
  displayImage="";
  doctordata:any=[];
  patientName:string="";
  doctorName:string="";
  contentClass="content mat-elevation-z8";
  count:number=0;
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
   medicine() : FormArray {
    return this.productForm.get("medicine") as FormArray
  }

  newQuantity(): FormGroup {

    return this.fb.group({
      drugname: this.drugname,
      quantity: 1,
      priceofone:this.drugprice,
      howtouse:'Daily'
    })
  }
  addMedicine() {
    this.medicine().push(this.newQuantity());
    this.count++;
    if(this.count>=2){
      this.contentClass="content2 mat-elevation-z8";
    }
  }

  removeMedicine(i:number) {
    this.medicine().removeAt(i);
    this.count--;
    if(this.count<2){
      this.contentClass="content mat-elevation-z8";
    }
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
      });
      this.patient.getonePatient(this.route.snapshot.params.id).subscribe(res=>{
        this.doctordata=res;
        this.displayImage=this.doctordata.displayImage;
      });

    })

  }
  logout() {
    this.auth.logout();
  }

}
