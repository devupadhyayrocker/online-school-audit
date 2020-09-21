

import { Component, OnInit } from '@angular/core';
import { AppConfig } from "../config/app.config";

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  selectedItems = [];
  dropdownSettings = {};
  dropdownList = AppConfig.Subjects;
    staffForm = {
    school: '',
    staffType: '',
    nonteachingArea: '',
    teacherType: '',
    teacherCategory: '',
    classTeacher: '',
    subject: '',
    class: '',
    section: '',
    staffName: '',
    staffEmail:'',
    staffContact:''
  }



  constructor() { }

  ngOnInit() {
    this.dropdownList = AppConfig.Subjects;
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      enableCheckAll: false
    }

  }

  onItemSelect(event){
console.log("yy",event)
  }
  OnItemDeSelect(event){
    console.log("yy",event)
      }

}
