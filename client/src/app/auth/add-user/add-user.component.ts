import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  password = 'password';
  isShow: boolean = false;
  show = false;
  staffDetails = {
    staffEmail: '',
    username: '',
    password: ''
  }


  combinedArray: any = [];
  rowIndex: number = -1;
  selectedArray: any = [];
  userData: any = [];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

  getPrincipalList() {
    this.commonService.getPrincipalList().subscribe(res => {
      if (res['data']) {
        this.userData = res['data'];
        console.log("tt", this.userData);
      }
    }, err => {
      console.log("err", err);
    })
  }

  getStaffList() {
    this.commonService.getStaffList().subscribe(res => {
      if (res['data']) {
        this.userData = res['data'];
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  onStaffSelect(val) {
    if (val == 'p') {
      this.getPrincipalList();
    } else {
      this.getStaffList();
    }
  }

  onClick(index) {
    if (index !== this.rowIndex) {
      this.rowIndex = index;
      this.password = 'text';
      this.isShow = true;
    } else {
      if (this.password === 'password') {
        this.password = 'text';
        this.isShow = true;
      } else {
        this.password = 'password';
        this.isShow = false;
      }
    }

  }

  onUserSelected(user) {
    this.staffDetails = {
      staffEmail: user.staffEmail,
      username: user.username,
      password: user.password
    }
  }


  sending(){
    this.commonService.sendMail(this.staffDetails).subscribe(res => {
      console.log("Tree", res);
    }, err => {
      console.log("eer", err);
    })
  }


  CheckAllOptions(optional) {
    if (this.userData.every(val => val.checked == true)) {
      this.userData.forEach(val => { val.checked = false });
    }

    else {
      this.userData.forEach(val => { val.checked = true });
    }

  }



}
