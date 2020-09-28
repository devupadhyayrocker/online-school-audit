import { Component, OnInit } from '@angular/core';
import { AppConfig } from "../config/app.config";
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.css']
})
export class AddAssessmentComponent implements OnInit {

  onselStaff = "";
  showTitle: boolean = false;
  showQues: boolean = false;
  enableQuesForm: boolean = false;
  onselAssessment = "";
  questionArray: any = [];
  quesCounter: any = [];
  formTitle: any = "";
  formConfig: any = {};
  questionObj: {
    title: '',
    question: ''
  }

  assessmentObj: {
    staffType: '',
    assessmentType: ''
  }

  selectStaffArr = AppConfig.selectStaff;
  selectAssessmentArr: any = [];
  formConfigArr = AppConfig.formConfig;

  question: any = "";

  constructor(private commonService: CommonService) { }

  ngOnInit() {

    this.assessmentObj = {
      staffType: '',
      assessmentType: ''
    }

    this.questionObj = {
      title: '',
      question: '',
    }

    // }
    // console.log("sel staff", this.selectStaffArr);

  }


  OnSelectStaff(event) {
    this.onselStaff = event;
    this.assessmentObj = {
      staffType: '',
      assessmentType: ''
    }
    if (event == 1) {
      this.selectAssessmentArr = AppConfig.principalFormList;
    } else if (event == 2) {
      this.selectAssessmentArr = AppConfig.TeachingFormList;
    } else if (event == 3) {
      this.selectAssessmentArr = AppConfig.TeachingFormList;
    }
    console.log("staff Val", event);
  }


  OnSelectAssessment(event) {
    let assessData = AppConfig.selectAssessment.find(item => {
      return item.name === event
    });
    let matValue = this.onselStaff + assessData.id;
    this.formConfig = AppConfig.formConfig.find(item => {
      return item.matrixValue == matValue
    })
    this.formTitle = this.formConfig.formName;
    this.enableQuesForm = true;
    console.log("frt", assessData, this.formConfig);
    // this.onselAssessment = event;
    // let matrixkey = this.onselStaff + this.onselAssessment;
    // let formObj = this.formConfigArr.filter(item => {
    //   return item.matrixValue === matrixkey
    // })
    // this.formTitle = formObj[0]['formName'];
    // console.log("mat Val", event, formObj[0]);
  }

  addTitle() {
    this.showTitle = true;
  }

  addQuestion() {
    this.showQues = true;
  }

  saveTitle() {
    let obj = {
      title: this.questionObj.title,
      questions: this.questionArray
    }
    this.quesCounter.push(obj);
    this.questionObj.title = "";
    this.questionArray = [];
    console.log("ete", this.quesCounter);
  }

  addQuestionToArr() {
    this.questionArray.push(this.questionObj.question);
    this.questionObj.question = "";
    console.log("ttt", this.questionArray);
  }

  saveToDB() {
    let dbObj = {
      type: this.formConfig.key,
      quesArr: this.quesCounter,
      options: this.formConfig.values,
      answers: [],
      totalMarks: this.formConfig.totalMarks,
      marksObtained: this.formConfig.marksObtained,
      role: this.formConfig.for[0],
      schoolId: "5f6f53379fea0e17ec4e89d8"
    }

    this.commonService.addreviewForm(dbObj).subscribe(res => {
      if (res['success']) {
        this.questionArray = [];
        this.quesCounter = [];
      }
      console.log("Res", res);
    }, err => {
      console.log("Err", err);
    })
  }
}
