export class Pres{
  _id:string="";
  name:string="";
  area:string="";
  pharmacy:string="";
  phone:string="";
  deliveryAddress:string="";
  

  constructor(_id:string,name:string, area:string,pharmacy:string,phone:string, deliveryAddress:string){
    this._id=_id;
    this.name=name;
    this.area=area;
    this.pharmacy=pharmacy;
    this.phone=phone;
    this.deliveryAddress=deliveryAddress;
    
  }

}



