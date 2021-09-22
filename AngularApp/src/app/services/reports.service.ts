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

  getPatientReports(id:string){
    return this._http.get<any>("http://localhost:3000/getPatientReportList/"+id);
  }

  getSingleReport(id:string){
    return this._http.get<any>("http://localhost:3000/getSingleReport/"+id);
  }
  updateReport(report:any, id:string){
    return this._http.put<any>("http://localhost:3000/updateReport/"+id, report);
  }

  deleteFromPatientList(data:any, patientid:string){
  return this._http.put<any>("http://localhost:3000/deleteReportfromList/"+patientid, data);
  }

  deleteReport(reportid:string){
    return this._http.delete<any>("http://localhost:3000/deleteReport/"+reportid);
  }
}
