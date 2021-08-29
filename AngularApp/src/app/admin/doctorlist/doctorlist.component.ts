import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {

  data=[
    {
      displayImage:"assets/add-doctor/pic.jpg",

      fullname:"deshan",
      currentHospital:"Kurunagala",
      type:"Dermetology"

    },
    {
      displayImage:"https://www.clipartmax.com/png/small/430-4305378_512-x-492-5-cartoon-dog-face-happy.png",
      fullname:"deshan",
      currentHospital:"Kurunagala",
      type:"Dermetology"

    },{
      displayImage:"https://www.clipartmax.com/png/small/430-4305378_512-x-492-5-cartoon-dog-face-happy.png",
      fullname:"deshan",
      currentHospital:"Kurunagala",
      type:"Dermetology"

    },{
      displayImage:"https://www.clipartmax.com/png/small/430-4305378_512-x-492-5-cartoon-dog-face-happy.png",
      fullname:"deshan",
      currentHospital:"Kurunagala",
      type:"Dermetology"

    },
  ]
  constructor() { }

  ngOnInit(): void {

  }

}
