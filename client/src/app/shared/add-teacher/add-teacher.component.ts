

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppConfig } from "../config/app.config";
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  schoolData: any = [];
  staffSubjectObj = {
    subjectName: '',
    className: '',
    sectionName: ''
  };
  schoolName: string = "";
  staffData: any = [];
  isEdit: boolean = false;
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
    staffEmail: '',
    staffContact: ''
  }



  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getSchoolList();
    this.getStaffList();
  }

  getStaffList() {
    this.commonService.getStaffList().subscribe(res => {
      if (res['data']) {
        this.staffData = res['data'];
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  onItemSelect(selected) {
    this.staffSubjectObj.subjectName = selected;


    console.log("ttt", this.staffSubjectObj);
  }

  onItemSelect2(selected) {
    console.log("re", selected);
    this.staffSubjectObj.className = selected;
    console.log("Tttyt", this.staffSubjectObj);
  }

  onItemSelect3(selected) {
    this.staffSubjectObj.sectionName = selected;
    console.log("re", selected);

  }

  OnItemDeSelect(selected) {
    this.staffSubjectObj.subjectName = '';
  }

  OnItemDeSelect2(selected) {
    this.staffSubjectObj.className = ''
    console.log("d2");
  }

  OnItemDeSelect3(selected) {
    this.staffSubjectObj.sectionName = '';
    console.log("d2", this.section);
  }

  getSchoolList() {
    this.commonService.getschoolList().subscribe(res => {
      if (res['data']) {
        this.schoolData = res['data'];
        console.log("tt", this.schoolData);
      }
    }, err => {
      console.log("err", err);
    })
  }

  OnSchoolChange(val) {
    let school_Name = this.schoolData.filter(item => {
      return item._id == val
    })
    this.schoolName = school_Name[0].schoolName;
  }


  addStaff(stForm) {
    let staffData = {
      schoolId: stForm.form.value.schools,
      staffEmail: stForm.form.value.staffEmail,
      isTeaching: stForm.form.value.staffType === 'Teaching' ? 1 : 0,
      staffArea: stForm.form.value.nonteachingArea,
      teachingType: stForm.form.value.teacherType === 'Scholastic' ? 1 : 0,
      teacherCategory: stForm.form.value.teacherCategory,
      isClassTeacher: stForm.form.value.classTeacher === 'Yes' ? 1 : 0,
      subjectDetails: this.staffSubjectObj,
      name: stForm.form.value.staffName,
      contactNo: stForm.form.value.staffContact,
      schoolName: this.schoolName
    }
    this.commonService.addStaff(staffData).subscribe(res => {
      if (res['success']) {
        this.closeBtn.nativeElement.click();
        stForm.reset();
        this.staffForm.classList = '';
        this.staffForm.staffType = '';
        this.staffForm.schools = '';
        this.staffForm.nonteachingArea = '';
        this.staffForm.teacherType = '',
          this.staffForm.classTeacher = ''
        this.staffForm.teacherCategory = '';
        this.getStaffList();
      }
    }, err => {
      console.log("erer", err);
    })
  }

  oenEditModal(staffData) {
    console.log("sd",staffData);
    this.staffForm ={
      schools: staffData.schoolId,
      staffType: '',
      nonteachingArea: staffData.staffArea,
      teacherType: staffData.isTeaching ? 'Scholastic':'Co-Scholastic',
      teacherCategory: '',
      classTeacher: staffData.isClassTeacher ? 'Yes' : 'No',
      Subjects: staffData.subjectDetails.subjectName,
      classList: staffData.subjectDetails.className,
      section: staffData.subjectDetails.sectionName,
      staffName: staffData.name,
      staffEmail: staffData.staffEmail,
      staffContact: staffData.contactNo
    }
    this.section.push(staffData.subjectDetails.sectionName);
    this.selectedItems3.push(staffData.subjectDetails.sectionName);
    this.isEdit = true;
    console.log("staffForm",this.staffForm);
  }


}
