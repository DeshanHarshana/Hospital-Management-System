import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    public _http:HttpClient,
  ) { }

  sendNotification(notofication:any){
    return this._http.post<any>("http://localhost:3000/sendNotification", notofication)
  }
  getAllnotification(){
    return this._http.get<any>("http://localhost:3000/getAllNotification")
  }
  getSpecificNotofication(id:string){
    return this._http.get<any>("http://localhost:3000/getSpecificAppoinment/"+id);
  }
  seen(id:string){
    return this._http.get<any>("http://localhost:3000/seen/"+id);
  }
}
