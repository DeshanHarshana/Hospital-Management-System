export class Product{

  name:string="";
  price:string="";
  quantity:string="";
  availability:string="";
  displayImage:string="";
  description:string="";
  _id:string="";
  category:string=""
  constructor(category:string, displayImage:string,_id:string, name:string, price:string, quantity:string, availability:string, description:string){
    this.name=name,
    this.price=price,
    this.quantity=quantity,
    this.availability = availability,
    this.displayImage=displayImage,
    this.description=description,
    this._id=_id,
    this.category=category
    }

}
