import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WardService {

  constructor(
    private _http:HttpClient,
    public router:Router
  ) { }

  getWarddetails(id:string){
    return this._http.get<any>("http://localhost:3000/get-ward-details/"+id);
  }

  updatewarddetails(ward:any,id:string){
    return this._http.put<any>("http://localhost:3000/post-ward-details/"+id,ward);
  }
}
