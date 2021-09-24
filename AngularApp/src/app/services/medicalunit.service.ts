import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MedicalunitService {

  constructor(
    private _http:HttpClient
  ) { }


  getmedicalUnitData(id:string){
    return this._http.get<any>("http://localhost:3000/get-medicalunit-data/"+ id);
  }
  updatemedicalUnit(id:string, data:any){
    return this._http.put<any>("http://localhost:3000/postmedicaldata/"+id, data);
  }
}
