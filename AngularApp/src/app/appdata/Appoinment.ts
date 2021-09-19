export class Appoinment{

  doctorname:string="";
  appoinmentDate:string="";
  appoinmentTime:string="";
  status:string="";
  displayImage:string="";
  doctorid:string="";
  _id:string="";
  displayImageP:string="";


  constructor(displayImageP:string,_id:string, doctorid:string,doctorname:string, displayImage:string, appoinmnetData:string, appoinmentTime:string, status:string){
    this.doctorname=doctorname,
    this.appoinmentDate=appoinmnetData,
    this.appoinmentTime=appoinmentTime,
    this.status=status,
    this.displayImage=displayImage
    this.doctorid=doctorid,
    this._id=_id;
    this.displayImageP=displayImageP;
    }

}
