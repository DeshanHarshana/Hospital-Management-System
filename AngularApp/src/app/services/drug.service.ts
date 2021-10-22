import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Drug } from '../appdata/Drug';

@Injectable({
  providedIn: 'root'
})
export class DrugService {
  constructor(
    private _http:HttpClient,
    public router:Router
  ) {}
  allDrugs():Observable<Drug[]>{
    return this._http.get<Drug[]>("http://localhost:3000/allDrugs");
  }
}
