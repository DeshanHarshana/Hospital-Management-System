import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Patient } from '../appdata/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(
    public _http:HttpClient,
    public router:Router

  ) { }

  getAllPatients():Observable<Patient[]>{
    return this._http.get<Patient[]>("http://localhost:3000/get-all-patients");
  }
  getonePatient(id:string){
    return this._http.get<any>("http://localhost:3000/get-one-patient/"+id);
  }
  updatePatient(patient:any, id:string){
    return this._http.put<any>("http://localhost:3000/update-patient/"+id, patient);
  }
  updateImage(id:string,image:any){
    return this._http.post<any>("http://localhost:3000/patient/"+id+"/updatePhoto", image);
  }
  deletePatient(id:string){
    return this._http.delete<any>('http://localhost:3000/delete-patient/'+id);
  }
  addDoctortoList(doctor:any, patientid:string){
    return this._http.post<any>('http://localhost:3000/doctoraddtopatientlist/'+patientid, doctor);

  }
}
