

import { Component, OnInit } from '@angular/core';
import { AppConfig } from "../config/app.config";

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  
  staffData = [{
    schools:"Delhi Public School",
    staffType:"Delhi Public School",
    nonteachingArea:"ghaziabad",
    teacherType:"delhi@gmail.com",
    teacherCategory:"Delhi Public School",
    classTeacher:"Delhi Public School",
    Subjects:"ghaziabad",
    classList:"delhi@gmail.com",
    section:"Delhi Public School",
    staffName:"Delhi Public School",
    staffEmail:"ghaziabad",
    staffContact:"delhi@gmail.com"
  },{
    schools:"Delhi Public School",
    staffType:"Delhi Public School",
    nonteachingArea:"ghaziabad",
    teacherType:"delhi@gmail.com",
    teacherCategory:"Delhi Public School",
    classTeacher:"Delhi Public School",
    Subjects:"ghaziabad",
    classList:"delhi@gmail.com",
    section:"Delhi Public School",
    staffName:"Delhi Public School",
    staffEmail:"ghaziabad",
    staffContact:"delhi@gmail.com"
  },{
    schools:"Delhi Public School",
    staffType:"Delhi Public School",
    nonteachingArea:"ghaziabad",
    teacherType:"delhi@gmail.com",
    teacherCategory:"Delhi Public School",
    classTeacher:"Delhi Public School",
    Subjects:"ghaziabad",
    classList:"delhi@gmail.com",
    section:"Delhi Public School",
    staffName:"Delhi Public School",
    staffEmail:"ghaziabad",
    staffContact:"delhi@gmail.com"
  },{
    schools:"Delhi Public School",
    staffType:"Delhi Public School",
    nonteachingArea:"ghaziabad",
    teacherType:"delhi@gmail.com",
    teacherCategory:"Delhi Public School",
    classTeacher:"Delhi Public School",
    Subjects:"ghaziabad",
    classList:"delhi@gmail.com",
    section:"Delhi Public School",
    staffName:"Delhi Public School",
    staffEmail:"ghaziabad",
    staffContact:"delhi@gmail.com"
  },{
    schools:"Delhi Public School",
    staffType:"Delhi Public School",
    nonteachingArea:"ghaziabad",
    teacherType:"delhi@gmail.com",
    teacherCategory:"Delhi Public School",
    classTeacher:"Delhi Public School",
    Subjects:"ghaziabad",
    classList:"delhi@gmail.com",
    section:"Delhi Public School",
    staffName:"Delhi Public School",
    staffEmail:"ghaziabad",
    staffContact:"delhi@gmail.com"
  },{
    schools:"Delhi Public School",
    staffType:"Delhi Public School",
    nonteachingArea:"ghaziabad",
    teacherType:"delhi@gmail.com",
    teacherCategory:"Delhi Public School",
    classTeacher:"Delhi Public School",
    Subjects:"ghaziabad",
    classList:"delhi@gmail.com",
    section:"Delhi Public School",
    staffName:"Delhi Public School",
    staffEmail:"ghaziabad",
    staffContact:"delhi@gmail.com"
  }]

  selectedItems = [];
  selectedItems2 = [];
  selectedItems3 = [];
  dropdownSettings = {};
  dropdownList = AppConfig.Subjects;
  schoolArr = AppConfig.schools;
  staffTypeArr = AppConfig.staffType;
  nonteachingAreaArr = AppConfig.nonteachingArea;
  teacherTypeArr = AppConfig.teacherType;
  teacherCategoryArr = AppConfig.teacherCategory;
  classTeacherArr = AppConfig.classTeacher;
  subjectArr = AppConfig.Subjects;
  classList = AppConfig.classList;
  section = AppConfig.section;
  
  
  
  staffForm = {
    schools: '',
    staffType: '',
    nonteachingArea: '',
    teacherType: '',
    teacherCategory: '',
    classTeacher: '',
    Subjects: '',
    classList: '',
    section: '',
    staffName: '',
    staffEmail:'',
    staffContact:''
  }



  constructor() { }

  ngOnInit() {

  }


  onItemSelect(selected) {
    const item = selected.item_text;
    this.subjectArr.push(item);
  }

  onItemSelect2(selected) {
    console.log("re",selected);
    this.classList.push(selected);
  }

  onItemSelect3(selected) {
    console.log("re",selected);
    this.section.push(selected);
  }

  OnItemDeSelect(selected) {
    this.subjectArr = this.subjectArr.filter(item => {
      return item != selected.item_text
    })
  }

  OnItemDeSelect2(selected) {
    this.classList = this.classList.filter(item => {
      return item != selected
    })
    console.log("d2",this.classList,this.classList.length>0);
  }

  OnItemDeSelect3(selected) {
    this.section = this.section.filter(item => {
      return item != selected
    })
    console.log("d2",this.section);
  }
  

  addStaff(stForm) {
    let staffData = {
    schools:stForm.form.value.schools,
    staffEmail:stForm.form.value.staffEmail,
    staffType: stForm.form.value.staffType,
    nonteachingArea: stForm.form.value.nonteachingArea,
    teacherType: stForm.form.value.teacherType,
    teacherCategory: stForm.form.value.teacherCategory,
    classTeacher: stForm.form.value.classTeacher,
    Subjects: stForm.form.value.Subjects,
    classList: stForm.form.value.classList,
    section: stForm.form.value.section,
    staffName: stForm.form.value.staffName,
    staffContact: stForm.form.value.staffContact
    }

    this.staffData.push(staffData);
    stForm.reset();
    console.log("test",this.staffData);
  }


}
