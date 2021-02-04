import { Component, OnInit } from '@angular/core';
import { AppConfig } from './../config/app.config';
import { CommonService } from 'src/app/shared/services/common/common.service';
@Component({
  selector: 'app-principal-assessment',
  templateUrl: './principal-assessment.component.html',
  styleUrls: ['./principal-assessment.component.css']
})
export class PrincipalAssessmentComponent implements OnInit {
  principalFormDisplay: boolean = true;
  staffTypeArr = AppConfig.staffType;
  staffCategoryArr: any = [];
  PrincipalEvaluationForm: any = {};
  staffData: any = [];
  staffData2: any = [];
  staffData3: any = [];
  questions: any = [];
  answers: any = [];
  principalSubmissions: any = [];
  totalQuestions = 0;
  totalMarks = 0;
  showSelect: boolean = true;
  staffId: string = "";
  principalteachingFormDisplay: boolean = true;
  principalAssessment = {
    nonteachingArea: '',
    staffCategory: '',
    staffType: '',
    teacherToAssess: '',

  }

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getStaffById();
  }


  getFormDetailsByRole(type) {
    this.commonService.getFormDetailsByRole().subscribe(res => {
      if (res['data']) {
        this.PrincipalEvaluationForm = res['data'].find(item => item.type === type);
        let totalTopics = this.PrincipalEvaluationForm.quesArr;
        if (totalTopics) {
          totalTopics.forEach(item => {
            this.totalQuestions = this.totalQuestions + item.questions.length
          })
        }
        console.log("tQ", this.totalQuestions);

        console.log("tt", this.PrincipalEvaluationForm);
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  getStaffById() {
    this.commonService.getStaffById().subscribe(res => {
      if (res['data']) {
        if (res['data'][0].PrincipalStaffDetails.length) {
          this.principalSubmissions = res['data'][0].PrincipalStaffDetails;
          console.log("ps", this.principalSubmissions,res['data'][0].PrincipalStaffDetails);
          this.getStaffList();
        } else {
          this.getStaffList();
        }
      }
    }, err => {
      console.log("Erere", err);
    })
  }


  getStaffList() {
    this.commonService.getStaffList().subscribe(res => {
      if (res['data']) {
        console.log("tttyyuui", this.principalSubmissions);
        if(this.principalSubmissions.length>0){
          res['data'].forEach(item=>{
              var str = false;
            this.principalSubmissions.forEach(i=>{
            if(i.staffId==item._id){
             str = true;
            }
          })
          if(str == false){
            this.staffData.push(item);
          }

          })
          console.log("tty",this.staffData);
          this.staffData2 = this.staffData;

        }else{
          this.staffData = res['data'];
          this.staffData2 = res['data'];
        }

      
      }
    }, err => {
      console.log("Erere", err);
    })
  }


  onStaffTypeChange(event) {
    console.log("teach", event);
    this.principalAssessment.staffCategory = '';
    if (event == "Teaching") {
      this.showSelect = true;
      this.staffCategoryArr = AppConfig.teacherCategory;
      this.getFormDetailsByRole(6);
      this.principalFormDisplay = true;
    }
    else {
      this.showSelect = false;
      // this.staffCategoryArr = AppConfig.nonteachingArea;
      this.getFormDetailsByRole(7);
      this.principalFormDisplay = true;
      this.staffData3 = this.staffData2.filter(item => {
        return item.isTeaching == false
      })
    }
  }


  onStaffCategoryChange(event) {
    console.log("stafftype", event);
    this.staffData3 = this.staffData2.filter(item => {
      return item.teacherCategory == event
    })
  }

  onStaffSelect(event) {
    this.staffId = event;
    console.log("dev", event);
    this.principalteachingFormDisplay = false;
  }

  principalEvaluation() {
    this.principalAssessment.staffCategory = '';
    this.principalAssessment.staffType = '';
    this.principalAssessment.teacherToAssess = '';
    let tot = this.answers.map(item => {
      this.totalMarks = this.totalMarks + item.answer;
      return this.totalMarks;
    })
    if (tot) {
      let staffObj = {
        Id: localStorage.getItem('userId'),
        staffId: this.staffId,
        answers: this.answers,
        totalMarks: this.totalMarks
      }
      this.commonService.updatePrincipalSubmission(staffObj).subscribe(res => {
        if (res['data']) {
          this.staffData =[];
          this.staffData2=[];
          this.staffData3=[];
          this.getStaffById();
          console.log("res", res);
        }
      }, err => {
        console.log("err", err);
      })
      this.principalFormDisplay = false;
      this.principalteachingFormDisplay = true;
    }
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

}
