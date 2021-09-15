export class Doctor{

  fullname:string="";
  displayImage:string="";
  type:string="";
  SLMC:string="";

  constructor(fullname:string, displayImage:string,SLMC:string,type:string){

    this.fullname=fullname;
    this.displayImage=displayImage;
    this.SLMC=SLMC;
    this.type=type;
  }

}
