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
//import { AddmedicineComponent } from './pharmacy/addmedicine/addmedicine.component';
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
import { PharmacyDashboardComponent } from './pharmacy2/pharmacy-dashboard/pharmacy-dashboard.component';

import { AddMedicineComponent } from './pharmacy2/add-medicine/add-medicine.component';
import { ShowMedicineComponent } from './pharmacy2/show-medicine/show-medicine.component';
import { PasswordResetComponent } from './doctor/password-reset/password-reset.component';
import { PatientPasswordResetComponent } from './patient/patient-password-reset/patient-password-reset.component';
import { PhamasistListComponent } from './admin/phamasist-list/phamasist-list.component';
import { RequestResetComponentComponent } from './request-reset-component/request-reset-component.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';
import { RequeestResetPatientComponent } from './requeest-reset-patient/requeest-reset-patient.component';
import { ResponseResetPatientComponent } from './response-reset-patient/response-reset-patient.component';


const routes: Routes = [

  { path: 'index', component:IndexComponent},
  { path: '', redirectTo:'/index', pathMatch:'full'},
  { path: 'login/:id', component:LoginComponent},
  { path: 'signup', component:SignupComponent},
  {path: 'Admin-dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path : 'Admin-show-doctorlist',component:DoctorlistComponent, canActivate:[AuthGuard]},
  {path : 'Admin-Add-Doctor', component:AdminAddDoctorComponent, canActivate:[AuthGuard]},
  {path : 'show-doctor-details/:id', component:ShowDoctorDetailsComponent},
  {path : 'edit-doctor-detais/:id', component:EditDoctorDetailsComponent},
  {path : 'Admin-show-patient-details/:id', component:PatientShowProfileComponent},
  {path : 'Admin-edit-patient-details/:id', component:PatientEditProfileComponent},
  {path : 'Admin-show-all-patient-list', component:AllPatientListComponent, canActivate:[AuthGuard]},
  {path : 'Admin-show-all-appoinment-list', component:AllAppoinmentListComponent, canActivate:[AuthGuard]},
  {path : 'Admin-show-all-phamasisit', component:PhamasistListComponent, canActivate:[AuthGuard]},

  //doctor
  {path:'Doctor-dashboard', component:DoctorDashboardComponent, canLoad:[DoctorGuard]},
  {path:'DoctorAppoinmentList', component:DoctorAppoinmentlistComponent, canActivate:[DoctorGuard]},
  {path:'DoctorPatientList/:id', component:PatientlistComponent},
  {path:'calendarDoctor', component:DoctorCalendarComponent, canActivate:[DoctorGuard]},
  {path:'Doctor-AddReport/:id', component:AddReportComponent, canActivate:[DoctorGuard]},
  {path:'Doctor-Notification/:id', component:CheckedAppointmentsComponent, canActivate:[DoctorGuard]},
  {path:'Doctor-Add-Prescription/:id', component:AddprescrptionComponent, canActivate:[DoctorGuard]},


  //ward
  {path : 'Admin-show-wardpage/:id',component:ShowWardpageComponent, canActivate:[AuthGuard]},
  {path : 'Admin-edit-ward-details/:id',component:EditWardDetailsComponent, canActivate:[AuthGuard]},

  //patient
  {path:'Patient-dashboard',component:PatientDashboardComponent, canActivate:[PatientGuard]},
  {path :'show-report/:id', component:ShowReportComponent},
  {path :'edit-report/:id', component:EditReportComponent},
  {path :'report-list/:id', component:ReportlistComponent},
  {path :'getAllDoctorAppoinment/:id', component:AppoinmentDoctorListComponent, canActivate:[PatientGuard]},
  {path :'getcurrentAppoinment', component:AppoinmentlistComponent, canActivate:[PatientGuard]},
  {path:'patient-bill/:id', component:PatientBillComponent},
  {path :'pharmacy', component:PharmacyComponent},
  {path: 'display-prescription', component:DisplayPrescriptionComponent, canActivate:[PatientGuard]},
  {path: 'show-prescription/:id', component:ShowPrescriptionComponent, canActivate:[PatientGuard]},
  {path: 'prescriptionList/:id', component:PrescriptionListComponent, canActivate:[PatientGuard]},
  {path:'patient-prescriptions/:id', component:PatientPrescriptionComponent,canActivate:[PatientGuard]},
  {path: 'pharmacyMedicineList', component:MedicineListPatientComponent,canActivate:[PatientGuard]},

   //appoinment
  {path:'appoinment/:id', component:AppoinmentComponent, canActivate:[PatientGuard]},

    //Pharmacy2
  
  { path : 'pharmacy-home', component: PharmacyDashboardComponent}, 
  { path : 'show-medicine', component: ShowMedicineComponent},
  { path : 'add-drug', component:AddMedicineComponent},
    
  
 
  //test
  {
    path : 'test', component:TestComponent,
    children:[
        {path :"child", component:ChildComponent},
        {path :"parent", component:ParentComponent},

    ]
  },


  //medicalunit
  {path:'edit-medical-unit/:id',component:EditMedicalUnitComponent,canActivate:[AuthGuard]},
  {path:'show-medical-unit/:id',component:ShowMedicalUnitComponent,canActivate:[AuthGuard]},

  //doctor time table
  {path:'doctor-timetable', component:DoctorTimetableComponent,canActivate:[DoctorGuard]},

  {path:'doctor-password-reset', component:PasswordResetComponent,canActivate:[DoctorGuard]},

  {path:'patient-password-reset', component:PatientPasswordResetComponent,canActivate:[PatientGuard]},
  //pharmacy
  {path:'allMedicineList', component:MedicineListComponent},
  //{path:'addMedicine', component:AddmedicineComponent},

  //forgot password

  {
    path: 'request-reset-password',
    component: RequestResetComponentComponent,
  },
  {
      path: 'response-reset-password/:token',
      component: ResponseResetComponent
    },
    {
      path: 'request-reset-password-patient',
      component: RequeestResetPatientComponent,
    },
    {
        path: 'response-reset-password-patient/:token',
        component: ResponseResetPatientComponent
      },
    //pagenot found
  { path : '**', component:PageNotFoundComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
