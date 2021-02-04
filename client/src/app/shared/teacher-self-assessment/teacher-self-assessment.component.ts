import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';



@Component({
  selector: 'app-teacher-self-assessment',
  templateUrl: './teacher-self-assessment.component.html',
  styleUrls: ['./teacher-self-assessment.component.css']
})
export class TeacherSelfAssessmentComponent implements OnInit {

  selfFormDisplay: boolean = true;
  TeacherSelfForm: any = {};
  staffData: any = [];
  questions: any = [];
  answers: any = [];
  totalQuestions = 0;
  totalMarks = 0;

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.getFormDetailsByRole();
    this.getStaffById();
  }



  getStaffById() {
    this.commonService.getStaffById().subscribe(res => {
      if (res['data']) {
        this.staffData = res['data'];
        if (this.staffData[0].isteachSelfSubmitted) {
          this.router.navigate(['/teacher_peer_assessment']);
        }
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  getFormDetailsByRole() {
    this.commonService.getFormDetailsByRole().subscribe(res => {
      if (res['data']) {
        this.TeacherSelfForm = res['data'].find(item => item.type === 1);
        let totalTopics = this.TeacherSelfForm.quesArr;
        if (totalTopics) {
          totalTopics.forEach(item => {
            this.totalQuestions = this.totalQuestions + item.questions.length
          })
        }
        console.log("tQ", this.totalQuestions);

        console.log("tt", this.TeacherSelfForm);
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


  submitSelfEvaluation() {
    let tot = this.answers.map(item=>{
      this.totalMarks = this.totalMarks + item.answer;
      return this.totalMarks;
    })

    if(tot){
    let staffData = {
      staffId: localStorage.getItem('userId'),
      formType: 1,
      answers: this.answers,
      totalMarks: this.totalMarks
    }
    this.commonService.updateAnswers(staffData).subscribe(res => {
      if (res['data']) {
        this.selfFormDisplay = false;
        this.totalMarks = 0;
        console.log("ansers_res", res);
      }
    },
      err => {
        console.log("answer_error", err);
      })
  }
}

}
