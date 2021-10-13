import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../appdata/Product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    public _http:HttpClient,
    public router:Router
  ) { }

  getProducts(){
    return this._http.get<Product[]>("http://localhost:3000/getProducts");
  }
  getProduct(id:string){
    return this._http.get<any>("http://localhost:3000/getProduct/"+id)
  }
  addProduct(data:any){
    return this._http.post<any>("http://localhost:3000/addProduct", data)
  }
  updateProduct(data:any, id:string){
    return this._http.put<any>("http://localhost:3000/editProduct/"+id, data)
  }
  deleteProduct(id:string){
    return this._http.delete("http://localhost:3000/deleteProduct/"+id)
  }
  productImage(id:string,image:any){
    return this._http.post<any>("http://localhost:3000/product/"+id+"/uploadPhoto", image);
  }
  updateImage(id:string,image:any){
    return this._http.post<any>("http://localhost:3000/product/"+id+"/updatePhoto", image);
  }
  updateAvailability(id:string, data:any){
    return this._http.put<any>("http://localhost:3000/productAvailability/"+id, data);
  }

}
