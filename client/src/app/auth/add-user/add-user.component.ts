import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  password;

  show = false;


  combinedArray: any = [];

  selectedArray: any = [];


  userData = [{
    fullName: "Delhi Public School",
    Email: "ghaziabad",
    userName: "delhi@gmail.com"
  },
  {
    fullName: "Delhi Public School",
    Email: "ghaziabad",
    userName: "delhi@gmail.com"
  },
  {
    fullName: "Delhi Public School",
    Email: "ghaziabad",
    userName: "delhi@gmail.com"
  },
  {
    fullName: "Delhi Public School",
    Email: "ghaziabad",
    userName: "delhi@gmail.com"
  },
  {
    fullName: "Delhi Public School",
    Email: "ghaziabad",
    userName: "delhi@gmail.com"
  }]


  constructor() { }

  ngOnInit() {
    this.password = 'password';
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }


  CheckAllOptions(optional) {
    if (this.combinedArray.every(val => val.checked == true)) {
      this.combinedArray.forEach(val => { val.checked = false });
      this.selectedArray = [];
    }

    else {
      this.combinedArray.forEach(val => { val.checked = true });
      this.selectedArray = this.combinedArray.filter(item => item);
    }

  }



}
