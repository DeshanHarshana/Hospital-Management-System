import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Patient } from '../appdata/Patient';
import { Pres} from '../appdata/Pres';

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
   prescriptionImage(id:string,image:any){

    return this._http.post<any>("http://localhost:3000/prescription/"+id+"/uploadPhoto", image);
  }
  getAllPrescription():Observable<Pres[]>{
    return this._http.get<Pres[]>("http://localhost:3000/get-all-prescription");

  }
  getsinglePrescription(id:string){
    return this._http.get<any>("http://localhost:3000/getsingleprescription/"+id);
  }
  getPrescrption(id:string){
    return this._http.get<any>("http://localhost:3000/getPrescription/"+id);
  }
  getAllPatientPrescriptions(patientid:string){
    return this._http.get<any>("http://localhost:3000/allpatientprescriptions/"+patientid);
  }

  deletePrescription(id:string){
    return this._http.delete("http://localhost:3000/deletePrescription/"+id);
  }

  changeAvalilability(id:string, data:any){
    return this._http.put<any>("http://localhost:3000/adminSign/"+id, data)
  }
}
