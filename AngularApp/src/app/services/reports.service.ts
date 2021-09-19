import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    public _http:HttpClient,
    public router:Router,
  ) { }

addReport(report:any){
    return this._http.post<any>("http://localhost:3000/add-report/", report);
  }
}
