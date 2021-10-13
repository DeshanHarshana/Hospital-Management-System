import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Patient } from '../appdata/Patient';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(
    public _http:HttpClient,
    public router:Router
   ) {
    
   }

   addPrescription(data:any){
     return this._http.post<any>("http://localhost:3000/add-Prescription", data);
   }
}
