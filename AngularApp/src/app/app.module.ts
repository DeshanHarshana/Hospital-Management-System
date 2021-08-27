import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { DoctorDetailsComponent } from './admin/doctor-details/doctor-details.component';
import { PatientDetailsComponent } from './admin/patient-details/patient-details.component';
import { AdminAboutComponent } from './admin/admin-about/admin-about.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { TestComponent } from './test/test/test.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AdminAddDoctorComponent } from './admin/admin-add-doctor/admin-add-doctor.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,

    PageNotFoundComponent,
    DashboardComponent,
    DoctorDetailsComponent,
    PatientDetailsComponent,
    AdminAboutComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    LoginComponent,
    SignupComponent,
    TestComponent,
    AdminAddDoctorComponent,

    ],
  imports: [
    MatAutocompleteModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatCheckboxModule,
  MatFormFieldModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
  MatInputModule,
  MatCardModule,
  ReactiveFormsModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
