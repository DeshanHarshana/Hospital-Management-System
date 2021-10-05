import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { FormControl, FormGroup } from '@angular/forms';
import { Methods } from 'src/app/appdata/methods';
import { SelectArea } from 'src/app/appdata/SelectArea';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css'],
  providers:[SelectArea]
})
export class PharmacyComponent implements OnInit {

  selected: boolean = true;
  tempData = ['Choose phamacy'];
  id: any = 0;
  data = [
    ["Choose pharmacy", "	Orryngo Pharmacy", "Rajya Osusala", "BIO pharmacy", "	Zam Zam Pharmacy"],
    ["Choose pharmacy","New Chamee Pharmacy", "C.P. Mohamed Pharmacy", "Queens Pharmacy"],
    ["Choose pharmacy","Apothicaries Pharmacy", "Central Pharmacy", "City Medicals", "	Food City -Badulla", "Reegal Pharmacy"],
    ["Choose pharmacy","K.R.Medical", "Tip Top Pharmacy", "Vision Pharma", "Alif Medicare" ],
    ["Choose pharmacy","Gagana Pharmacy", "	KANDY Pharmacy", "ORIENT PHARMACY", "	Food City -Avissawella", 	"Elite Pharmacy", "Nawala Chemist", "Reward Pharmacy & Grocery", "Pelawatte Pharmacy", "Apco Pharmacy"   ],
    ["Choose pharmacy","Delmon Pharmacy", "	Medi Mart Pharmacy", "Oxford Pharmacy", "	Royal Pharmacy", "Silvas Medical Stores", "Get Well Pharmacy"   ],
    ["Choose pharmacy","Sahana Pharmacy", "Rosewood Pharmacy", "Purasanda Pharmacy", 	"New safeway Pharmacy", "New Global Pharmacy", "Osada Pharmacy", "	Asiri Medicals (Near Hospital)", "Royal Pharmacy"],
    ["Choose pharmacy","Jeewaka Pharmacy", "Kodikara Pharmacy", "Midco Pharmacy", "Medicare Pharmacy" ],
    ["Choose pharmacy","Bharathy Medical Pharmacy", "Rajya Osusala", "Royal Pharmacy", "Sukam Pharmacy", "Sri Murugan Pharmacy", "V Zone Medicals" ],
    ["Choose pharmacy","Dawn Pharmacy", "Osmaniya Phamacy", "Lanka Pharmacy", "Wasana Pharmacy" ],
    ["Choose pharmacy","Vision Pharmacy", "Digasiri Medi Care", "A.S.N. Pharmacy", "Medi Scan Pharmacy", "Sun Pharmacy", "Ceylon Pharma", "DDR Pharmacy Pvt. Ltd.", "Hewage Pharmacy", "Lanka Pharmacy (pvt) Ltd"	 ],
    ["Choose pharmacy","Cresent Pharmacy", "Orient Pharmacy", "Global Pharmacya", "Sethma Pharmacy" ],
    ["Choose pharmacy","Global Pharmacy", "TKashika Pharmacy", "New Rational Pharmacy"],
    ["Choose pharmacy","Suwana Medicals", "N.S. Pharmacticals Pvt Ltd", "Tharindu Pharmacy", "Wallawa Medical", "	City Medicals" ],
    ["Choose pharmacy","Ben Pharmacy", "Bismi Pharmacy"],
    ["Choose pharmacy","Kandegedara Baby Care Pharmacy", "Supun Pharmacy", "Thushara Pharmacy"],
    ["Choose pharmacy","Heladiwa Healthcare", "Matara Pharmacy", "New Chathuranga Pharmacy", "New Medi Care Pharmacy", "New Medi Care Pharmacy", "Tharushi Pharmacy" ],
    ["Choose pharmacy","Kataragama Pharmacy", "Buttala Pharmacy", "Madulla Pharmacy", "Life Care" ],
    ["Choose pharmacy","Arany Pharmacy", "Jathu Pharmacy" ],
    ["Choose pharmacy","Lanka Pharmacy", "New City Medical", "Uma Enterprises", "H C.C. Pharmacy", "New City Pharmacy" ],
    ["Choose pharmacy","Osran Pharmacy", "Sanudhi Pharmacy", "Jeewaka Pharmacy", "Up Country Pharmacy" ],
    ["Choose pharmacy","Health Care Pharmacy", "Suhada Pharmacy (Pvt) Ltd.", "Union Pharmacy", "JS Pharmacy", "C.M.C.Pharmacy" ],
    ["Choose pharmacy","New Luck Medical", "ASK Pharmacy", 	"Ayagama Pharmacy", "Janalanka Pharmacy" ],
    ["Choose pharmacy","Sri Sai Medical", "Food City -Trincomalee", "M.I.M. Pharmacy"],
    ["Choose pharmacy","New Lanka Medicare", "Pills Pharmacy", "Get well health care"],


  ]



  prescription = new FormGroup({
    name: new FormControl(''),
    area : new FormControl(''),
    pharmacy:new FormControl(''),
    phone : new FormControl(''),
    deliveryAddress:new FormControl('')
  });

  constructor(
    private auth: AuthenticationService,
    private route: Router,
    private s : SelectArea,
    private prescriptionService:PrescriptionService,
    public toastr:ToastrService,
  ) { }



  public districtChange(event: any): void {

    this.tempData = this.data[event.target.value];
    this.selected = false;
 }

  public pharmacyChange(event: any): void {
    console.log(event.target.value);

  }
  addPrescription(data:any)
  {
    data.area = this.s.convert(data.area);
    console.log(data);
    this.prescriptionService.addPrescription(data).subscribe((res)=>{
      this.toast('Successfully  add prescription!');
    })
  }

  toast(message:String) {
    this.toastr.success(message.toString(), "Adding Prescription");
   }

  ngOnInit(): void {
  }

  logout() {

    this.auth.logout();
  }
}
