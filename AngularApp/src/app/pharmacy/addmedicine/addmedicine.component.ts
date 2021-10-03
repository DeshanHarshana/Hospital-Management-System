import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/loader/loader.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-addmedicine',
  templateUrl: './addmedicine.component.html',
  styleUrls: ['./addmedicine.component.css']
})
export class AddmedicineComponent implements OnInit {
  product = new FormGroup({
    name:new FormControl(""),
    price:new FormControl(""),
    quantity:new FormControl(""),
    availability:new FormControl(true),
    description:new FormControl(""),
    displayImage:new FormControl(""),
    category:new FormControl("")

  })
  imageData:string='';
  image:any;
  isImageselected:boolean=false;
  constructor(

    public toastr:ToastrService,
    public router:Router,
    public loaderService:LoaderService,
    private auth:AuthenticationService,
    private productService:ProductService

  ) { }

  ngOnInit(): void {
    this.isImageselected=false;
    this.imageData="../../../assets/add-doctor/nopic.png";
    this.product.get("category")?.setValue("Choose Product Category")
  }
  logout(){

    this.auth.logout();
      }

      addProduct(product:any){
        product.displayImage="";
        console.log(product);
        if(!this.isImageselected){
          this.toastr.warning("Select Image", "Before Adding Product");
        }else{


        this.productService.addProduct(product).subscribe(res=>{
          this.toastr.success(res.message.toString(), "Adding Product");
          console.log(res.id);
          this.uploadImage(res.id);

      this.product.get('name')?.setValue('');
      this.product.get('price')?.setValue('');
      this.product.get('quantity')?.setValue('');
      this.product.get('availability')?.setValue('');
      this.product.get('description')?.setValue('');
      this.product.get("category")?.setValue("Choose Product Category")
      this.imageData="../../../assets/add-doctor/nopic.png";
      this.image=null
      this.isImageselected=false;


        })}}




      toast(message:String) {
        this.toastr.warning(message.toString(), "Adding Product");
       }

      onFileSelect(event : Event){
        const target= event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        this.image=file;
        this.isImageselected=true;
        const allowedFileTypes=["image/png", "image/jpeg", "image/jpg"];
        if(this.image && allowedFileTypes.includes(this.image.type)){
          const reader=new FileReader();
          reader.onload = () => {
            this.imageData=reader.result as string;
          }
          reader.readAsDataURL(this.image);
        }
      }


      uploadImage(id:string){

        let fd=new FormData();
        if(this.image){
          fd.append("productImage", this.image, this.image.name);

          this.productService.productImage(id,fd).subscribe((res)=>{
            console.log(res);

          })
        }
      }
    }
