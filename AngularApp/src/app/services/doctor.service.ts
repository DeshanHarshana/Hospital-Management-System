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
}
