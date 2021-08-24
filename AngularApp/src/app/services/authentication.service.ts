import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    public _http:HttpClient,
    public router:Router

  ) { }

  loginUser(user:any)  {
    return this._http.post<any>("http://localhost:3000/login", user);
  }
  signup(user:any){
    return this._http.post<any>("http://localhost:3000/signup", user);
  }
}
