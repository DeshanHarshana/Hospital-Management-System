import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    public _http:HttpClient,
    public router:Router
  ) { }


  getAdmin(){
    return this._http.get<any>("http://localhost:3000/admin-data/")
  }
  dashboardData(){
    return this._http.get<any>("http://localhost:3000/getDashboardData")
  }
}
