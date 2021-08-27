import { Component, OnInit } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';
@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {

  data=[
    {
      displayImage:"https://www.stives.com/wp-content/uploads/sites/2/2018/10/03_Scrubs-Face-wash_457x458-300x300.jpg",
      fullname:"deshan",
      currentHospital:"Kurunagala",
      type:"Dermetology"

    },
    {
      displayImage:"https://www.stives.com/wp-content/uploads/sites/2/2018/10/03_Scrubs-Face-wash_457x458-300x300.jpg",
      fullname:"deshan",
      currentHospital:"Kurunagala",
      type:"Dermetology"

    },{
      displayImage:"https://www.stives.com/wp-content/uploads/sites/2/2018/10/03_Scrubs-Face-wash_457x458-300x300.jpg",
      fullname:"deshan",
      currentHospital:"Kurunagala",
      type:"Dermetology"

    },{
      displayImage:"https://www.stives.com/wp-content/uploads/sites/2/2018/10/03_Scrubs-Face-wash_457x458-300x300.jpg",
      fullname:"deshan",
      currentHospital:"Kurunagala",
      type:"Dermetology"

    },
  ]
  constructor() { }

  ngOnInit(): void {

  }

}
