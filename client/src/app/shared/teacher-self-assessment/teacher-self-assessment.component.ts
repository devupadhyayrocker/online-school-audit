import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-teacher-self-assessment',
  templateUrl: './teacher-self-assessment.component.html',
  styleUrls: ['./teacher-self-assessment.component.css']
})
export class TeacherSelfAssessmentComponent implements OnInit {

  selfFormDisplay : boolean = true;
  TeacherSelfForm: any = [];
  staffData: any = [];

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getFormDetailsByRole();
    this.getStaffList();
  }

  submitSelfEvaluation(event){
    this.selfFormDisplay = false;
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

  getFormDetailsByRole() {
    this.commonService.getFormDetailsByRole().subscribe(res => {
      if (res['data']) {
        this.TeacherSelfForm = res['data'];
      }
    }, err => {
      console.log("Erere", err);
    })
  }

}
