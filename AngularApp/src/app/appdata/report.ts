

export class Report{
    name:string="";
    age:string="";
    guardian: string="";
    gender: string="";
    relationship:string="";
    taddress:string="";
    paddress: string="";
    phone: string="";
    email:string="";
    occupation: string="";
    weight: string="";
    height: string="";
    heartDisease:boolean=false;
    diabetes:boolean=false;
    hbp:boolean=false;
    canser:boolean=false;
    hc:boolean=false;
    kidney:boolean=false;
    stroke:boolean=false;
    dep:boolean=false;
    surgeries: string="";
    medications: string="";
    latex:boolean=false;
    iodine:boolean=false;
    bromine:boolean=false;
    description:string="";
    date:string="";
    sign:string="";
  doctorid:string="";
    patientid:string="";
    doctorname:string="";

    constructor(name:string, age:string, guardian:string, gender:string, relationship:string, taddress:string, paddress:string, phone:string, email:string, occupation:string, weight:string, height:string, heartDisease:boolean, diabetes:boolean, hbp:boolean, canser:boolean, hc:boolean, kidney:boolean, stroke:boolean, dep:boolean, surgeries:string, medications:string, latex:boolean, iodine:boolean, bromine:boolean, description:string, date:string, sign:string, doctorid:string, patientid:string, doctorname:string ){
      this.name=name;
      this.age=age;
      this.guardian=guardian;
      this.relationship=relationship;
      this.taddress=taddress;
      this.paddress=paddress;
      this.phone=phone;
      this.email=email;
      this.occupation=occupation;
      this.weight=weight;
      this.height=height;
      this.heartDisease=heartDisease;
      this.diabetes=diabetes;
      this.hbp=hbp;
      this.canser=canser;
      this.hc=hc;
      this.kidney=kidney;
      this.stroke=stroke;
      this.dep=dep;
      this.surgeries=surgeries;
      this.medications=medications;
      this.latex=latex;
      this.iodine=iodine;
      this.bromine=bromine;
      this.description=description;
      this.date=date;
      this.sign=sign;
      this.doctorid=doctorid;
      this.patientid=patientid;
      this.doctorname=doctorname;


    }
}