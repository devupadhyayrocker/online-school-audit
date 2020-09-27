import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  schoolData = [];
  schoolForm = {
    schoolName: '',
    staffEmail: '',
    location: ''
  }
  isEdit: boolean = false;
  schoolId: string = "";
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getSchoolList();
  }

  addSchool(scForm) {
    let schoolData = {
      schoolName: scForm.form.value.schoolName,
      location: scForm.form.value.location,
      schoolEmail: scForm.form.value.staffEmail
    }
    console.log("rr",schoolData);
    this.commonService.addSchool(schoolData).subscribe(res=>{
      if(res['success']){
        this.schoolData = res['data'];
        this.getSchoolList();
        this.closeBtn.nativeElement.click();
        scForm.reset();
      }
    },err=>{
      console.log("err",err);
    })

  }

  getSchoolList() {
    this.commonService.getschoolList().subscribe(res => {
      if (res['data']) {
        this.schoolData = res['data'];
        console.log("tt",this.schoolData);
      }
    }, err => {
      console.log("err", err);
    })
  }

  openEditForm(schoolDetails) {
    this.schoolForm = {
      schoolName: schoolDetails.schoolName,
      staffEmail: schoolDetails.schoolEmail,
      location: schoolDetails.location
    }
    this.isEdit = true;
    this.schoolId = schoolDetails._id;
  }

  updateSchool(schoolDetails) {
    let schoolData = {
      schoolId: this.schoolId,
      schoolName: schoolDetails.form.value.schoolName,
      location: schoolDetails.form.value.location,
      schoolEmail: schoolDetails.form.value.staffEmail,
    }
    this.commonService.updateSchool(schoolData).subscribe(res => {
      if (res['data']) {
        this.getSchoolList();
        this.closeBtn.nativeElement.click();
        this.isEdit = false;
      }
    }, err => {
      console.log("err", err);
    })
  }

  deleteSchool(school){
    let schoolData ={
      schoolId: school._id
    }
    this.commonService.deleteSchool(schoolData).subscribe(res => {
      if (res['success']) {
        this.getSchoolList();
      }
    }, err => {
      console.log("err", err);
    })
  }




}
