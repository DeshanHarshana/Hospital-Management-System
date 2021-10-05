export class SelectArea{
    constructor(){

    }
    convert(data:string){
        switch(data){
            case '0':
              data = "Ampara"; 
              break;
            case '1':
                data = "Anuradhapura"; 
                break;
            case '2':
                data = "Badulla"; 
                break;
            case '3':
                data = "Batticaloa"; 
                break;
            case '4':
                data = "Colombo"; 
                break;
            case '5':
                data = "Galle";
                break;
            case '6':
                data = "Gampaha";
                break;
            case '7':
                data = "Hambantota";
                break;
            case '8':
                data = "Jaffna";
                break;
            case '9':
                data = "Kalutara";
                break
            case '10':
                data = "Kandy";
                break;
            case '11':
                data = "Kegalle";
                break;
            case '12':
                data = "Kilinochchi";
                break;
            case '13':
                data = "Kurunegala";
                break;
            case '14':
                data = "Mannar";
                break;
            case '15':
                data = "Matale";
                break;
            case '16':
                data = "Matara";
                break;
            case '17':
                data = "Moneragala";
                break;
            case '18':
                data = "Mullaitivu";
                break;
            case '19':
                data = "Nuwara Eliya<";
                break;
            case '20':
                data = "Polonnaruwa";
                break;
            case '21':
                data = "Puttalam";
                break;
            case '22':
                data = "Ratnapura";
                break;
            case '23':
                data = "Trincomalee";
                break;
            case '24':
                data = "Vavuniya";
                break;
            
            default:
              data = "unkonwn";
          }
          return data;
    }
}