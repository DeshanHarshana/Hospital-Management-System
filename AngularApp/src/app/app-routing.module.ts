import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { report } from 'process';

import { AdminAddDoctorComponent } from './admin/admin-add-doctor/admin-add-doctor.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';

import { DoctorlistComponent } from './admin/doctorlist/doctorlist.component';
import { EditDoctorDetailsComponent } from './admin/edit-doctor-details/edit-doctor-details.component';
import { ShowDoctorDetailsComponent } from './admin/show-doctor-details/show-doctor-details.component';


import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { PatientGuard } from './guards/patient.guard';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllPatientListComponent } from './patient/all-patient-list/all-patient-list.component';
import { EditReportComponent } from './patient/edit-report/edit-report.component';

import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';


import { PatientShowProfileComponent } from './patient/patient-show-profile/patient-show-profile.component';
import { ShowReportComponent } from './patient/show-report/show-report.component';

import { SignupComponent } from './signup/signup.component';
import { TestComponent } from './test/test/test.component';

import { ShowWardpageComponent } from './admin/show-wardpage/show-wardpage.component';
import { EditWardDetailsComponent } from './admin/edit-ward-details/edit-ward-details.component';

import { PatientEditProfileComponent } from './patient/patient-edit-profile/patient-edit-profile.component';
import { ChildComponent } from './test/child/child.component';
import { ParentComponent } from './test/parent/parent.component';
import { AppoinmentComponent } from './appoinment/appoinment/appoinment.component';
import { AddReportComponent } from './patient/add-report/add-report.component';



import { EditMedicalUnitComponent } from './edit-medical-unit/edit-medical-unit.component';
import { ShowMedicalUnitComponent } from './show-medical-unit/show-medical-unit.component';

import { ReportlistComponent } from './patient/reportlist/reportlist.component';
import { AppoinmentDoctorListComponent } from './patient/appoinment-doctor-list/appoinment-doctor-list.component';
import { AppoinmentlistComponent } from './patient/appoinmentlist/appoinmentlist.component';
import { DoctorAppoinmentlistComponent } from './doctor/doctor-appoinmentlist/doctor-appoinmentlist.component';
import { PatientlistComponent } from './doctor/patientlist/patientlist.component';
import { CalenderComponent } from './test/calender/calender.component';
import { DoctorCalendarComponent } from './doctor/doctor-calendar/doctor-calendar.component';
import { DoctorTimetableComponent } from './patient/doctor-timetable/doctor-timetable.component';
import { MedicineListComponent } from './pharmacy/medicine-list/medicine-list.component';
import { AddmedicineComponent } from './pharmacy/addmedicine/addmedicine.component';
import { PharmacyComponent } from './patient/pharmacy/pharmacy.component';

import { DisplayPrescriptionComponent } from './admin/display-prescription/display-prescription.component';
import { ShowPrescriptionComponent } from './patient/show-prescription/show-prescription.component';
import { MedicineListPatientComponent } from './pharmacy/medicine-list-patient/medicine-list-patient.component';
import { AllAppoinmentListComponent } from './admin/all-appoinment-list/all-appoinment-list.component';
import { CheckedAppointmentsComponent } from './doctor/checked-appointments/checked-appointments.component';
import { AddprescrptionComponent } from './doctor/addprescrption/addprescrption.component';
import { PrescriptionListComponent } from './patient/prescription-list/prescription-list.component';
import { PatientPrescriptionComponent } from './patient/patient-prescription/patient-prescription.component';
import { PatientBillComponent } from './patient/patient-bill/patient-bill.component';




const routes: Routes = [

  { path: 'index', component:IndexComponent},
  { path: '', redirectTo:'/index', pathMatch:'full'},
  { path: 'login/:id', component:LoginComponent},
  { path: 'signup', component:SignupComponent},

  {path:'Admin-dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path : 'Admin-show-doctorlist',component:DoctorlistComponent, canActivate:[AuthGuard]},

  {path : 'Admin-Add-Doctor', component:AdminAddDoctorComponent, canActivate:[AuthGuard]},
  {path : 'show-doctor-details/:id', component:ShowDoctorDetailsComponent},
  {path : 'edit-doctor-detais/:id', component:EditDoctorDetailsComponent},
  {path : 'Admin-show-patient-details/:id', component:PatientShowProfileComponent},
  {path : 'Admin-edit-patient-details/:id', component:PatientEditProfileComponent},
  {path : 'Admin-show-all-patient-list', component:AllPatientListComponent},
  {path : 'Admin-show-all-appoinment-list', component:AllAppoinmentListComponent},

  //doctor
  {path:'Doctor-dashboard', component:DoctorDashboardComponent, canActivate:[DoctorGuard]},

  {path:'DoctorAppoinmentList', component:DoctorAppoinmentlistComponent, canActivate:[DoctorGuard]},
  {path:'DoctorPatientList', component:PatientlistComponent, canActivate:[DoctorGuard]},
  {path:'calendarDoctor', component:DoctorCalendarComponent, canActivate:[DoctorGuard]},
  {path:'Doctor-AddReport/:id', component:AddReportComponent},
  {path:'Doctor-Notification/:id', component:CheckedAppointmentsComponent, canActivate:[DoctorGuard]},
  {path:'Doctor-Add-Prescription/:id', component:AddprescrptionComponent, canActivate:[DoctorGuard]},


  //ward
  {path : 'Admin-show-wardpage/:id',component:ShowWardpageComponent},
  {path : 'Admin-edit-ward-details/:id',component:EditWardDetailsComponent},







  //patient
  {path:'Patient-dashboard',component:PatientDashboardComponent, canActivate:[PatientGuard]},

  {path :'show-report/:id', component:ShowReportComponent},
  {path :'edit-report/:id', component:EditReportComponent},
  {path :'report-list/:id', component:ReportlistComponent},
  {path :'getAllDoctorAppoinment', component:AppoinmentDoctorListComponent, canActivate:[PatientGuard]},
  {path :'getcurrentAppoinment', component:AppoinmentlistComponent, canActivate:[PatientGuard]},
  {path:'patient-bill/:id', component:PatientBillComponent},
  {path :'pharmacy', component:PharmacyComponent},
  {path: 'display-prescription', component:DisplayPrescriptionComponent},
  {path: 'show-prescription/:id', component:ShowPrescriptionComponent},
  {path: 'prescriptionList/:id', component:PrescriptionListComponent},
  {path:'patient-prescriptions/:id', component:PatientPrescriptionComponent},
  {path: 'pharmacyMedicineList', component:MedicineListPatientComponent},



  //appoinment
  {path:'appoinment/:id', component:AppoinmentComponent, canActivate:[PatientGuard]},

  //test
  {
    path : 'test', component:TestComponent,
    children:[
        {path :"child", component:ChildComponent},
        {path :"parent", component:ParentComponent},

    ]
  },


  //medicalunit
  {path:'edit-medical-unit/:id',component:EditMedicalUnitComponent},
  {path:'show-medical-unit/:id',component:ShowMedicalUnitComponent},

  //doctor time table
  {path:'doctor-timetable', component:DoctorTimetableComponent},

  //pharmacy
  {path:'allMedicineList', component:MedicineListComponent},
  {path:'addMedicine', component:AddmedicineComponent},

    //pagenot found
  { path : '**', component:PageNotFoundComponent },

  //Pharmacy2
  //{ path : 'pharmacy-dashboard', component: PharmacyDashboardComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
