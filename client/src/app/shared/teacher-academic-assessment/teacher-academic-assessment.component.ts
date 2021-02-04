import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppConfig } from './../config/app.config';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-teacher-academic-assessment',
  templateUrl: './teacher-academic-assessment.component.html',
  styleUrls: ['./teacher-academic-assessment.component.css']
})
export class TeacherAcademicAssessmentComponent implements OnInit {

  CroFormDisplay: boolean = false;
  CroSubmitDisplay:boolean = false;
  sortedClass: any = [];
  sortedSubject: any = [];
  sortedStaff: any = [];
  schoolData = [];
  schoolId: string = "";
  EditorCroForm: any = {};
  staffData: any = [];
  userData: any = [];
  questions: any = [];
  croData = [];
  answers: any = [];
  totalQuestions = 0;
  totalMarks = 0;
  classArr = AppConfig.classList;
  subjectArr = AppConfig.Subjects;
  teacherTypeArr = AppConfig.teacherType;
  observedByArr = AppConfig.observed_by;
  staffId = "";
  req_class :boolean = true;
  req_sub :boolean = true;
  req_date :boolean = false;
  req_obsBy :boolean = false;
  req_obs_rem :boolean = false;

  CroFormDetails = {
    schoolName: '',
    StaffName: '',
    class: '',
    subject: '',
    CroDate: '',
    observedBy: '',
    teacherType: '',
    ObserverRemarks: ''
  }



  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.getSchoolList();
    this.getEditorReviews();

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

  getEditorReviews() {
    this.commonService.getEditorReviews().subscribe(res=>{
        if(res['data']){
          this.croData = res['data'][0].croEvaluation;
          console.log("dataaaa",res['data'],this.croData);
        }
      }, err=>{
        console.log("errrr",err);
      }
      )
  }
  
  
  getStaffList() {
    this.commonService.getAdminStaffList().subscribe(res => {
      if (res['data']) {
        this.staffData = res['data'];
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  onDateSelected(event) {
    this.CroFormDetails.CroDate = event;
  }

  getStaffById() {
    this.commonService.getStaffById().subscribe(res => {
      if (res['data']) {
        this.staffData = res['data'];

      }
    }, err => {
      console.log("Erere", err);
    })
  }



  getFormDetailsByRole(type) {
    this.commonService.getFormDetailsByRole().subscribe(res => {
      if (res['data']) {
        this.EditorCroForm = res['data'].find(item => item.type === type);
        let totalTopics = this.EditorCroForm.quesArr;
        if (totalTopics) {
          totalTopics.forEach(item => {
            this.totalQuestions = this.totalQuestions + item.questions.length
          })
        }
        console.log("tQ", this.totalQuestions);

        console.log("tt", this.EditorCroForm);
      }
    }, err => {
      console.log("Erere", err);
    })
  }



  mark1(event, index, titleIndex, num) {
    console.log(index, titleIndex, num);
    // let str = titleIndex + '' +  index + '' + num;
    let Obj = {
      titleIndex: titleIndex,
      quesIndex: index,
      answer: num,
      type: 1
    }

    let keyIndex = this.answers.findIndex(item => item.titleIndex == titleIndex && item.quesIndex == index);
    console.log("exist", keyIndex);
    if (keyIndex !== -1) {
      this.answers[keyIndex] = Obj;
    } else {
      this.answers.push(Obj);
    }

    console.log("mark1", JSON.stringify(this.answers));
  }

  submitCroEvaluation() {

    let tot = this.answers.map(item => {
      this.totalMarks = this.totalMarks + item.answer;
      return this.totalMarks;
    })

    if (tot) {
      let staffData = {
        staffId: this.staffId,
        Id: localStorage.getItem('userId'),
        croData: [{
          class: this.CroFormDetails.class,
          subject: this.CroFormDetails.subject,
          CroDate: this.CroFormDetails.CroDate,
          ObserverRemarks: this.CroFormDetails.ObserverRemarks,
          observedBy: this.CroFormDetails.observedBy,
          answers: this.answers,
          totalMarks: this.totalMarks
        }]
      }
      let objArr = [];
      objArr.push(staffData)
      console.log("ddr0", staffData);
      this.commonService.updateEditorSubmission(objArr).subscribe(res => {
        if (res['data']) {
          this.CroFormDisplay = false;
          this.CroSubmitDisplay = true;
          this.CroFormDetails.schoolName = '';
          this.CroFormDetails.class = '';
          this.CroFormDetails.StaffName = '';
          this.CroFormDetails.observedBy = '';
          this.CroFormDetails.ObserverRemarks = '';
          this.CroFormDetails.subject = '';
          this.CroFormDetails.teacherType = '';
          this.CroFormDetails.CroDate = '';
          this.sortedClass = [];
          this.sortedSubject = [];
          this.sortedStaff= [];
          this.totalMarks = 0;
          console.log("ansers_res", res);
        }
      },
        err => {
          console.log("answer_error", err);
        })
    }
  }


  onObserverSelect(event) {
    this.CroFormDetails.observedBy = event;
    console.log("oby", event);
  }


  onSchoolChange(event) {
    this.CroFormDisplay = false;
    this.CroSubmitDisplay = false;
    this.CroFormDetails.StaffName = '';
    this.CroFormDetails.class = '';
    this.CroFormDetails.subject = '';
    this.CroFormDetails.teacherType = '';
    let sId = this.schoolData.find(item => item.schoolName === event)._id;
    this.commonService.getStaffList2(sId).subscribe(res => {
      this.sortedStaff = res['data'].filter(item => item.isTeaching == true);
      // this.sortedStaff.sort(function(a,b){return a.name < b.name ? -1 : 1});
      console.log("res", res);
    }, err => {
      console.log("err", err);
    })
  }

  onStaffSelect(event) {
    console.log("evv",event);
    this.CroFormDisplay = true;
    this.staffId = event;
    this.CroFormDetails.class = '';
    this.CroFormDetails.subject = '';
    this.CroFormDetails.teacherType = '';
    let cId = this.sortedStaff.find(item => item._id === event).className;
    this.sortedClass = cId;
    let sId = this.sortedStaff.find(item => item._id === event).subjectName;
    this.sortedSubject = sId;
    let teachingType = this.sortedStaff.find(item => item._id === event).teachingType;
    this.CroFormDetails.teacherType = teachingType == true ? "Scholastic" : "Co-Scholastic"
    this.onteacherTypeSelect(this.CroFormDetails.teacherType);
     let staffObj = this.croData.find(item=> item.staffId === event);
    let subjArr = staffObj['croData'].map(item=> item.subject);
    this.sortedSubject = this.sortedSubject.filter(x => !subjArr.includes(x));
     console.log("obj",staffObj,subjArr);
  }

  onClassChange(event) {
    this.req_class = false;
  }
  onSubjectSelect(event) {
    this.req_sub = false;
  }


  onteacherTypeSelect(event) {
    console.log("teach", event);
    this.EditorCroForm.staffCategory = '';
    if (event == "Scholastic") {
      // this.showSelect = true;
      this.teacherTypeArr = AppConfig.teacherType;
      this.getFormDetailsByRole(8);
      this.EditorCroForm = true;
    }
    else {
      // this.showSelect = false;
      // this.staffCategoryArr = AppConfig.nonteachingArea;
      this.getFormDetailsByRole(9);
      this.EditorCroForm = true;
    }
  }


}
