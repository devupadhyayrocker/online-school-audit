import { Component, OnInit } from '@angular/core';

import { AppConfig } from "../config/app.config";
@Component({
  selector: 'app-assign-teacher',
  templateUrl: './assign-teacher.component.html',
  styleUrls: ['./assign-teacher.component.css']
})
export class AssignTeacherComponent implements OnInit {

  peerStaffData = [{
    teacherWhoPeer: 'teacher 11',
    teacherToPeer: 'teacher 22'
  }]
  dropdownSettings = {};
  teacherCategoryArr = AppConfig.teacherCategory;
  peerStaffArr = AppConfig.peerStaffDemo;
  staffTypeArr = AppConfig.staffType;

  peeredStaffForm = {
    teacherWhoPeer: '',
    teacherToPeer: '',
    teacherCategory: '',
    staffType: ''
  }

  constructor() { }

  ngOnInit() {
  }

  addpeeredStaff(asteForm) {
    let peerStaffData = {
      teacherWhoPeer: asteForm.form.value.teacherWhoPeer,
      teacherToPeer: asteForm.form.value.teacherToPeer,
    }

    this.peerStaffData.push(peerStaffData);
    asteForm.reset();
  }


}
