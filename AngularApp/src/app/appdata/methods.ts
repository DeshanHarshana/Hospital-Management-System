export class Methods {
  constructor(){

  }

  doctorWard(data:string){
    var ward=0;
    switch(data){
      case "Epidemiologist":
        ward=1;
        break;
      case "Dentist":
        ward=2;
        break;
      case "Pediatrician":
        ward=3;
        break;
      case "Podiatrist":
        ward=4;
        break;
      case "Dermatologist":
        ward=5;
        break;
      case "Radiologist":
        ward=6;
        break;

      case "Neonatologist":
        ward=7;
        break;
      case "Dentist":
        ward=8;
        break;
      case "Cardiologist":
        ward=10;
        break;
      case "Plastic surgeon":
        ward=12;
        break;
      default:
        ward=9;
        break;
    }
    return ward;
  }

 convert(date:string){

var day=date.toString().split(" ")[2];
var month=date.toString().split(" ")[1]
var year=date.toString().split(" ")[3];
var monthNo:Number=0;
switch (month) {
  case "Jan":
      monthNo=1;
      break;
  case "Feb":
      monthNo=2;
      break;
  case "Mar":
      monthNo=3;
      break;
  case "Apr":
      monthNo=4;
      break;
  case "May":
      monthNo=5;
      break;
  case "Jun":
      monthNo=6;
      break;
  case "Jul":
      monthNo=7;
      break;
  case "Aug":
      monthNo=8;
      break;
  case "Sep":
      monthNo=9;
      break;
  case "Oct":
      monthNo=10;
      break;
  case "Nov":
      monthNo=11;
      break;
  case "Dec":
      monthNo=12;
      break;
  default:
      console.log("No such day exists!");
      break;
}
return year + "-" + monthNo.toString() + "-" + day;
}

}
