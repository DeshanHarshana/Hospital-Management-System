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
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { TestComponent } from './test/test/test.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AdminAddDoctorComponent } from './admin/admin-add-doctor/admin-add-doctor.component';
import { DoctorshowComponent } from './admin/doctorshow/doctorshow.component';
import { DoctorlistComponent } from './admin/doctorlist/doctorlist.component';
import { AngularTiltModule } from 'angular-tilt';
import { InterceptorService } from './loader/interceptor.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ShowDoctorDetailsComponent } from './admin/show-doctor-details/show-doctor-details.component';
import { EditDoctorDetailsComponent } from './admin/edit-doctor-details/edit-doctor-details.component';
import { DoctorAddPatientsComponent } from './doctor/doctor-add-patients/doctor-add-patients.component';
import { AuthGuard } from './guards/auth.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { PatientGuard } from './guards/patient.guard';







import { PatientShowProfileComponent } from './patient/patient-show-profile/patient-show-profile.component';
import { PatientEditProfileComponent } from './patient/patient-edit-profile/patient-edit-profile.component';
import { AllPatientListComponent } from './patient/all-patient-list/all-patient-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgCircleProgressModule } from 'ng-circle-progress';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { ShowReportComponent } from './patient/show-report/show-report.component';
import { EditReportComponent } from './patient/edit-report/edit-report.component';
import { ChildComponent } from './test/child/child.component';
import { ParentComponent } from './test/parent/parent.component';
import { AppoinmentComponent } from './appoinment/appoinment/appoinment.component';


import { EditMedicalUnitComponent } from './edit-medical-unit/edit-medical-unit.component';
import { ShowMedicalUnitComponent } from './show-medical-unit/show-medical-unit.component';


import { ReportlistComponent } from './patient/reportlist/reportlist.component';
import { AppoinmentDoctorListComponent } from './patient/appoinment-doctor-list/appoinment-doctor-list.component';
import { AppoinmentlistComponent } from './patient/appoinmentlist/appoinmentlist.component';




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
    DoctorshowComponent,
    DoctorlistComponent,
    DoctorAddPatientsComponent,
    ShowDoctorDetailsComponent,
    EditDoctorDetailsComponent,

    PatientShowProfileComponent,
    PatientEditProfileComponent,
    AllPatientListComponent,

    ShowReportComponent,
    EditReportComponent,
    ChildComponent,
    ParentComponent,
    AppoinmentComponent,

    EditMedicalUnitComponent,
    ShowMedicalUnitComponent,

    ReportlistComponent,
    AppoinmentDoctorListComponent,
    AppoinmentlistComponent,




    ],
  imports: [
    ImageCropperModule,
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
  ToastrModule.forRoot(),
  AngularTiltModule,
  MatPaginatorModule,
  Ng2SearchPipeModule,
  Ng2OrderModule,
  NgxPaginationModule,
  FontAwesomeModule,
  NgCircleProgressModule.forRoot({
    // set defaults here
    radius: 100,
    outerStrokeWidth: 16,
    innerStrokeWidth: 8,
    outerStrokeColor: "#78C000",
    innerStrokeColor: "#C7E596",
    animationDuration: 300,

  }),
  FontAwesomeModule,
  MatDatepickerModule,
  MatNativeDateModule,
  NgxMaterialTimepickerModule,
  NgxMatTimepickerModule

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorService,
      multi:true
    },
    AuthGuard,
    DoctorGuard,
    PatientGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
