export class Doctor{
  _id:string="";
  fullname:string="";
  displayImage:string="";
  type:string="";
  SLMC:string="";

  constructor(_id:string,fullname:string, displayImage:string,SLMC:string,type:string){
    this._id=_id;
    this.fullname=fullname;
    this.displayImage=displayImage;
    this.SLMC=SLMC;
    this.type=type;
  }

}
