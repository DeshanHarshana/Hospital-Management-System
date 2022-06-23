import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PharmacistService {

  constructor(
    public _http:HttpClient,
    public router:Router
  ) { }

  addPharmacist(data:any){
   return  this._http.post<any>("http://localhost:3000/addnewPharmacist",data)
  }

  getPharmacist(id:any){
    return this._http.get<any>("http://localhost:3000/getPhamasisit/"+id);
  }
  getAllPhamasisit(){
    return this._http.get<any>('http://localhost:3000/getAllPhamasist');
  }
  deletePhamasist(id:any){
    return this._http.get<any>('http://localhost:3000/deletePhamasist/'+id);
  }
}
