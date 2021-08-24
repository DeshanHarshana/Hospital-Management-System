import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAboutComponent } from './admin/admin-about/admin-about.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DoctorDetailsComponent } from './admin/doctor-details/doctor-details.component';
import { PatientDetailsComponent } from './admin/patient-details/patient-details.component';

import { DoctorAboutComponent } from './doctor/doctor-about/doctor-about.component';
import { DoctorAddPatientsComponent } from './doctor/doctor-add-patients/doctor-add-patients.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientAboutComponent } from './patient/patient-about/patient-about.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [

  { path: 'index', component:IndexComponent},
  { path: '', redirectTo:'/index', pathMatch:'full'},
  { path: 'login/:id', component:LoginComponent},
  { path: 'signup', component:SignupComponent},
  {
    path:'Admin-dashboard',
    component:DashboardComponent,
    children:[
      {path : 'Admin-About', component:AdminAboutComponent},
      {path : 'Admin-Doctor-Details', component:DoctorDetailsComponent},
      {path : 'Admin-Patient-Details', component:PatientDetailsComponent}
    ]

  },
  {
    path:'Doctor-dashboard',
    component:DoctorDashboardComponent,

    children:[
      {path : 'Doctor-About', component:DoctorAboutComponent},
      {path : 'Doctor-DoctorAddpatient', component:DoctorAddPatientsComponent},
      ]

  },
  {
    path:'Patient-dashboard',
    component:PatientDashboardComponent,
    children:[
      {path : 'Patient-About', component:PatientAboutComponent},
      ]

  },


    { path : '**', component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
