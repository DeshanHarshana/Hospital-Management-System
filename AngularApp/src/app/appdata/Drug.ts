export class Drug{

  _id:string="";
  id:number=0;
  drugname:string="";
  price:number=0;
  description:string="";



  constructor(description:string,_id:string, drugname:string, id:number, price:number){
    this._id=_id,
    this.id=id,
    this.description=description,
    this.drugname=drugname,
    this.price=price
    }

}
