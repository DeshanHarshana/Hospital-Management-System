import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAboutComponent } from './admin/admin-about/admin-about.component';
import { AdminAddDoctorComponent } from './admin/admin-add-doctor/admin-add-doctor.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DoctorDetailsComponent } from './admin/doctor-details/doctor-details.component';
import { DoctorlistComponent } from './admin/doctorlist/doctorlist.component';
import { PatientDetailsComponent } from './admin/patient-details/patient-details.component';

import { DoctorAddPatientsComponent } from './doctor/doctor-add-patients/doctor-add-patients.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientAboutComponent } from './patient/patient-about/patient-about.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { TestComponent } from './test/test/test.component';

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
      {path : 'Admin-Add-Doctor', component:AdminAddDoctorComponent},
      {path : 'Admin-show-doctorlist', component:DoctorlistComponent}
    ]

  },
  {
    path:'Doctor-dashboard',
    component:DoctorDashboardComponent,

    children:[

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
  {path : 'test', component:TestComponent},


    { path : '**', component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
