import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {

  constructor(private _router:Router) {

  }
  canActivate():boolean{
    if(localStorage.getItem("access")=="patient"){
      return true;

    }else{
      this._router.navigate(['/']);
      return false;
    }
  }
}
