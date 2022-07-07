import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Doctor } from '../appdata/Doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    public _http:HttpClient,
    public router:Router

  ) { }

  resetPassword(reset:any){
    return this._http.post<any>("http://localhost:3000/doctor-reset-password",reset);
  }

  forgotPassword(forgot:any){
    return this._http.post<any>("http://localhost:3000/doctor-fogot-password",forgot);
  }

  addDoctor(doctor:any){
    return this._http.post<any>("http://localhost:3000/add-new-doctor", doctor);
  }
  doctorImage(id:string,image:any){

    return this._http.post<any>("http://localhost:3000/doctor/"+id+"/uploadPhoto", image);
  }
  updateImage(id:string,image:any){

    return this._http.post<any>("http://localhost:3000/doctor/"+id+"/updatePhoto", image);
  }

  getAllDoctors():Observable<any>{
    return this._http.get<any>("http://localhost:3000/get-all-doctors");
  }
  getAllDoctorAppoinment():Observable<Doctor[]>{
    return this._http.get<Doctor[]>("http://localhost:3000/get-all-doctors");
  }

  getoneDoctor(id:string){
    return this._http.get<any>("http://localhost:3000/get-one-doctor/"+id);
  }

  updateDoctor(doctor:any, id:string){
    return this._http.put<any>("http://localhost:3000/update-doctor/"+id, doctor);
  }
  deleteDoctor(id:string){
    return this._http.delete<any>('http://localhost:3000/delete-doctor/'+id);
  }

  putAppoinment(appoinment:any, doctorId:string){
    return this._http.post("http://localhost:3000/updateAppoinmentList/"+doctorId, appoinment);
  }
  acceptAppoinment(patient:any, doctorID:string){
    return this._http.post("http://localhost:3000/acceptAppoinment/"+doctorID, patient);

  }
  getPatientList(doctorid:string){
    return this._http.get("http://localhost:3000/getDoctorpatientlist/"+doctorid);

  }
  changeAvalilability(id:string, data:any){
    return this._http.put<any>("http://localhost:3000/changeAvailability/"+id, data)
  }
  dashboardData(){
    return this._http.get<any>("http://localhost:3000/getDashboardData")
  }

  requestReset(body:any): Observable<any> {
    return this._http.post('http://localhost:3000/req-reset-password', body);
  }

  newPassword(body:any): Observable<any> {
    return this._http.post('http://localhost:3000/new-password', body);
  }

  ValidPasswordToken(body:any): Observable<any> {
    return this._http.post('http://localhost:3000/valid-password-token', body);
  }

  getIdusingEmail(email:any){
    return this._http.get<any>("http://localhost:3000/getDoctorIDfromEmail/"+email);
  }
}
