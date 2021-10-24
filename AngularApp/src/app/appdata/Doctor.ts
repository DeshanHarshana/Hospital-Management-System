export class Doctor{
  _id:string="";
  fullname:string="";
  displayImage:string="";
  type:string="";
  SLMC:string="";
  available:boolean=false;

  constructor(_id:string,fullname:string, displayImage:string,SLMC:string,type:string, available:boolean){
    this._id=_id;
    this.fullname=fullname;
    this.displayImage=displayImage;
    this.SLMC=SLMC;
    this.type=type;
    this.available=available
  }

}
