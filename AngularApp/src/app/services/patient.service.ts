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
}
