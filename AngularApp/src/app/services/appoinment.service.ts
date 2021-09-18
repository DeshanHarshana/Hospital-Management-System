import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Appoinment } from '../appdata/Appoinment';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentService {

  constructor(
    public _http:HttpClient,
    public router:Router
  ) { }

  putAppoinment(appoinmnet:any){
    return this._http.post<any>("http://localhost:3000/add-new-appoinment", appoinmnet);
  }
  getPatienthisAppoinments(id:string):Observable<Appoinment[]>{
    return this._http.get<Appoinment[]>("http://localhost:3000/specificAppoinmentList/"+id)
  }
  getPatienthisAppoinmentsDoctor(id:string):Observable<Appoinment[]>{
    return this._http.get<Appoinment[]>("http://localhost:3000/specificAppoinmentListDoctor/"+id)
  }

  deleteAppoinment(id:string){
    return this._http.delete<any>('http://localhost:3000/deleteAppoinment2/'+id);
  }
  deleteAppoinmentinDoctorlist(id:string, appoinment:any){
    return this._http.put<any>("http://localhost:3000/deleteAppoinment/"+id, appoinment);
  }
  changeAppoinmentState(id:string){
    return this._http.get<any>("http://localhost:3000/changeAppoinmentState/"+id);
  }
}
