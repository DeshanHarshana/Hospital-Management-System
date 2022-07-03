import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private info:any

  constructor() { }

  public setData(data:any){
    this.info=data
  }
  public getData(){
    return this.info;
  }
  
}
