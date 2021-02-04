import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-teacher-other-assessment',
  templateUrl: './teacher-other-assessment.component.html',
  styleUrls: ['./teacher-other-assessment.component.css']
})
export class TeacherOtherAssessmentComponent implements OnInit {

  documentFormDisplay: boolean = true;
  TeacherDocumentForm: any = {};
  staffData: any = [];
  questions: any = [];
  answers: any = [];
  totalQuestions = 0;
  filteredQuesArr: any = [];
  isLoggedIn: boolean = false;
  totalMarks = 0;

  constructor(private commonService: CommonService, private router: Router) {
    this.router.events.subscribe(event => {
      let isLogin = localStorage.getItem('token');
      if (isLogin) {
        this.isLoggedIn = true;
      }
    })


  }

  ngOnInit() {
    this.getFormDetailsByRole();
    this.getStaffById();
  }

  doLogOut() {
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/login'])
  }


  getStaffById() {
    this.commonService.getStaffById().subscribe(res => {
      if (res['data']) {
        this.staffData = res['data'];
        // this.getFormDetailsByRole();
        if (this.staffData[0].isDocSubmitted) {
          this.documentFormDisplay = false;
        }
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  getFormDetailsByRole() {
    this.commonService.getFormDetailsByRole().subscribe(res => {
      if (res['data']) {
        this.TeacherDocumentForm = res['data'].find(item => item.type === 3);
        let totalTopics = this.TeacherDocumentForm.quesArr;
        if (totalTopics) {
          totalTopics.forEach(item => {
            this.totalQuestions = this.totalQuestions + item.questions.length
          })
        }
        console.log("tQ", this.totalQuestions);

        console.log("tt", this.TeacherDocumentForm);
      }
    }, err => {
      console.log("Erere", err);
    })
  }
  
  // getFormDetailsByRole() {
  //   this.commonService.getFormDetailsByRole().subscribe(res => {
  //     if (res['data']) {
  //       this.TeacherDocumentForm = res['data'].find(item => item.type === 3);

  //       if (this.staffData.length>0) {
  //         console.log("tty", this.TeacherDocumentForm);
  //         this.TeacherDocumentForm.quesArr.forEach(item => {
  //           if (item.title == 'For Class Teachers') {
  //             if (this.staffData[0].isClassTeacher === true) {
  //               this.filteredQuesArr.push(item);
  //             }
  //           } else if (item.title == 'Subject Teachers (who are not class teachers)') {
  //             if (!this.staffData[0].isClassTeacher && this.staffData[0].teachingType) {
  //               this.filteredQuesArr.push(item);
  //             }
  //           } else {
  //             if (item.title == 'Co-Scholastic teachers') {
  //               if (this.staffData[0].teachingType === false) {
  //                 this.filteredQuesArr.push(item);
  //               }
  //             }
  //           }
  //         })
  //         console.log("fa", this.filteredQuesArr);
  //       }
  //       let totalTopics = this.filteredQuesArr;
  //       if (totalTopics) {
  //         totalTopics.forEach(item => {
  //           this.totalQuestions = this.totalQuestions + item.questions.length
  //         })
  //       }
  //       console.log("tQ", this.totalQuestions);

  //       console.log("tt", this.TeacherDocumentForm);
  //     }
  //   }, err => {
  //     console.log("Erere", err);
  //   })
  // }

  mark1(event, index, titleIndex, num) {
    console.log(index, titleIndex, num);
    // let str = titleIndex + '' +  index + '' + num;
    let Obj = {
      titleIndex: titleIndex,
      quesIndex: index,
      answer: num,
      type: 3
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


  submitDocumentEvaluation() {
    let tot = this.answers.map(item=>{
      this.totalMarks = this.totalMarks + item.answer;
      return this.totalMarks;
    })

    if(tot){
    let staffData = {
      staffId: localStorage.getItem('userId'),
      formType: 3,
      answers: this.answers,
      totalMarks: this.totalMarks
    }
    this.commonService.updateAnswers(staffData).subscribe(res => {
      if (res['data']) {
        this.documentFormDisplay = false;
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
