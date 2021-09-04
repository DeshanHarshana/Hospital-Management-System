import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  logout(){
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Stay Login',
    }).then((result) => {

      if (result.isConfirmed) {
        localStorage.removeItem('access');
        this.router.navigate(['/']);

      } else if (result.isDismissed) {

        console.log('Clicked No, File is safe!');

      }
    })


  }
}
