import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { report } from 'process';
import { AdminAboutComponent } from './admin/admin-about/admin-about.component';
import { AdminAddDoctorComponent } from './admin/admin-add-doctor/admin-add-doctor.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';

import { DoctorlistComponent } from './admin/doctorlist/doctorlist.component';
import { EditDoctorDetailsComponent } from './admin/edit-doctor-details/edit-doctor-details.component';
import { ShowDoctorDetailsComponent } from './admin/show-doctor-details/show-doctor-details.component';

import { DoctorAddPatientsComponent } from './doctor/doctor-add-patients/doctor-add-patients.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { PatientGuard } from './guards/patient.guard';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllPatientListComponent } from './patient/all-patient-list/all-patient-list.component';
import { EditReportComponent } from './patient/edit-report/edit-report.component';
import { PatientAboutComponent } from './patient/patient-about/patient-about.component';
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



const routes: Routes = [

  { path: 'index', component:IndexComponent},
  { path: '', redirectTo:'/index', pathMatch:'full'},
  { path: 'login/:id', component:LoginComponent},
  { path: 'signup', component:SignupComponent},
  {path:'Admin-dashboard',component:DashboardComponent, canActivate : [AuthGuard]},
  {path : 'Admin-show-doctorlist',component:DoctorlistComponent, canActivate : [AuthGuard]},
  {path : 'Admin-About', component:AdminAboutComponent, canActivate : [AuthGuard]},
  {path : 'Admin-Add-Doctor', component:AdminAddDoctorComponent, canActivate : [AuthGuard]},
  {path : 'Admin-show-doctor-details/:id', component:ShowDoctorDetailsComponent, canActivate : [AuthGuard]},
  {path : 'Admin-edit-doctor-detais/:id', component:EditDoctorDetailsComponent, canActivate : [AuthGuard]},
  {path : 'Admin-show-wardpage',component:ShowWardpageComponent, canActivate : [AuthGuard]},
  {path : 'Admin-edit-ward-details',component:EditWardDetailsComponent, canActivate : [AuthGuard]},
  {path : 'Admin-show-patient-details/:id', component:PatientShowProfileComponent, canActivate:[AuthGuard]},
  {path : 'Admin-edit-patient-details/:id', component:PatientEditProfileComponent, canActivate:[AuthGuard]},
  {path : 'Admin-show-all-patient-list', component:AllPatientListComponent, canActivate:[AuthGuard]},


  //doctor
  {path:'Doctor-dashboard', component:DoctorDashboardComponent, canActivate:[DoctorGuard]},
  {path : 'Doctor-DoctorAddpatient', component:DoctorAddPatientsComponent, canActivate:[DoctorGuard]},


  //patient
  {path:'Patient-dashboard',component:PatientDashboardComponent, canActivate:[PatientGuard]},
  {path : 'Patient-About', component:PatientAboutComponent, canActivate:[PatientGuard]},
  {path:'show-report', component:ShowReportComponent, canActivate:[PatientGuard]},
  {path:'edit-report', component:EditReportComponent, canActivate:[PatientGuard]},

  //test
  {path : 'test', component:TestComponent},
  {path:'child', component:ChildComponent},
  {path:'parent', component:ParentComponent},


  //appoinment
  {path:'appoinment', component:AppoinmentComponent},

  //pagenot found
  { path : '**', component:PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
