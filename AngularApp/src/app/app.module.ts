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
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { TestComponent } from './test/test/test.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AdminAddDoctorComponent } from './admin/admin-add-doctor/admin-add-doctor.component';
import { DoctorlistComponent } from './admin/doctorlist/doctorlist.component';
import { AngularTiltModule } from 'angular-tilt';
import { InterceptorService } from './loader/interceptor.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ShowDoctorDetailsComponent } from './admin/show-doctor-details/show-doctor-details.component';
import { EditDoctorDetailsComponent } from './admin/edit-doctor-details/edit-doctor-details.component';
import { AuthGuard } from './guards/auth.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { PatientGuard } from './guards/patient.guard';
import { ShowWardpageComponent } from './admin/show-wardpage/show-wardpage.component';
import { EditWardDetailsComponent } from './admin/edit-ward-details/edit-ward-details.component';
import { PatientShowProfileComponent } from './patient/patient-show-profile/patient-show-profile.component';
import { PatientEditProfileComponent } from './patient/patient-edit-profile/patient-edit-profile.component';
import { AllPatientListComponent } from './patient/all-patient-list/all-patient-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ShowReportComponent } from './patient/show-report/show-report.component';
import { EditReportComponent } from './patient/edit-report/edit-report.component';
import { ChildComponent } from './test/child/child.component';
import { ParentComponent } from './test/parent/parent.component';
import { AppoinmentComponent } from './appoinment/appoinment/appoinment.component';
import { AddReportComponent } from './patient/add-report/add-report.component';
import { EditMedicalUnitComponent } from './edit-medical-unit/edit-medical-unit.component';
import { ShowMedicalUnitComponent } from './show-medical-unit/show-medical-unit.component';
import { ReportlistComponent } from './patient/reportlist/reportlist.component';
import { AppoinmentDoctorListComponent } from './patient/appoinment-doctor-list/appoinment-doctor-list.component';
import { AppoinmentlistComponent } from './patient/appoinmentlist/appoinmentlist.component';
import { CheckedAppointmentsComponent } from './doctor/checked-appointments/checked-appointments.component';

import { DoctorAppoinmentlistComponent } from './doctor/doctor-appoinmentlist/doctor-appoinmentlist.component';
import { PatientlistComponent } from './doctor/patientlist/patientlist.component';
import { CalenderComponent } from './test/calender/calender.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr'
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DoctorCalendarComponent } from './doctor/doctor-calendar/doctor-calendar.component';
import { DoctorTimetableComponent } from './patient/doctor-timetable/doctor-timetable.component';
import { MedicineListComponent } from './pharmacy/medicine-list/medicine-list.component';
import { AddmedicineComponent } from './pharmacy/addmedicine/addmedicine.component';
import { PharmacyComponent } from './patient/pharmacy/pharmacy.component';
import { MedicineListPatientComponent } from './pharmacy/medicine-list-patient/medicine-list-patient.component';
import { AllAppoinmentListComponent } from './admin/all-appoinment-list/all-appoinment-list.component';
import { DisplayPrescriptionComponent } from './admin/display-prescription/display-prescription.component';
import { ShowPrescriptionComponent } from './patient/show-prescription/show-prescription.component';
import { NgxPrintModule } from 'ngx-print';
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
import { ResponseResetPatientComponent } from './response-reset-patient/response-reset-patient.component';
import { RequeestResetPatientComponent } from './requeest-reset-patient/requeest-reset-patient.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PageNotFoundComponent,
    DashboardComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    LoginComponent,
    SignupComponent,
    TestComponent,
    AdminAddDoctorComponent,
    DoctorlistComponent,
    ShowDoctorDetailsComponent,
    EditDoctorDetailsComponent,
    ShowWardpageComponent,
    EditWardDetailsComponent,
    PatientShowProfileComponent,
    PatientEditProfileComponent,
    AllPatientListComponent,
    ShowReportComponent,
    EditReportComponent,
    ChildComponent,
    AppoinmentComponent,
    AddReportComponent,
    EditMedicalUnitComponent,
    ShowMedicalUnitComponent,
    ReportlistComponent,
    AppoinmentDoctorListComponent,
    AppoinmentlistComponent,
    CheckedAppointmentsComponent,

    DoctorAppoinmentlistComponent,
    PatientlistComponent,
    CalenderComponent,
    DoctorCalendarComponent,
    DoctorTimetableComponent,
    MedicineListComponent,
    AddmedicineComponent,
    PharmacyComponent,
    MedicineListPatientComponent,
    AllAppoinmentListComponent,
    DisplayPrescriptionComponent,
    ShowPrescriptionComponent,
    AddprescrptionComponent,
    PrescriptionListComponent,
    PatientPrescriptionComponent,
    PatientBillComponent,
    PharmacyDashboardComponent,
    AddMedicineComponent,
    ShowMedicineComponent,
    PasswordResetComponent,
    PatientPasswordResetComponent,
    PhamasistListComponent,
    RequestResetComponentComponent,
    ResponseResetComponent,
    ResponseResetPatientComponent,
    RequeestResetPatientComponent,












    ],

  imports: [
    ImageCropperModule,
    MatAutocompleteModule,
    HttpClientModule,
    BrowserModule,
    NgxPrintModule,
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
    NgxMatTimepickerModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    AuthGuard,
    DoctorGuard,
    PatientGuard,
    NgxPrintModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
