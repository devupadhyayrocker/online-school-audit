import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-non-teaching-peer-assessment',
  templateUrl: './non-teaching-peer-assessment.component.html',
  styleUrls: ['./non-teaching-peer-assessment.component.css']
})
export class NonTeachingPeerAssessmentComponent implements OnInit {

  peerFormDisplay: boolean = true;
  nonTeachingPeerForm: any = {};
  staffData: any = [];
  questions: any = [];
  peerObject = {};
  answers: any = [];
  peerArr: any = [];
  totalQuestions = 0;
  peerName: string = "";
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
    this.getFormDetails();
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
        if (this.staffData[0].isnonTeachPeerSubmitted) {
          this.peerFormDisplay = false;
        }
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  getPeerName(peer) {
    this.commonService.getStaffById2(peer).subscribe(res => {
      if (res['data']) {
        this.peerName = res['data'][0].name;
        console.log("res", this.peerName);
      }

    }, err => {
      console.log("err", err);
    })
  }

  getFormDetails() {
    this.commonService.getFormDetails().subscribe(res => {
      if (res['data']) {
        this.peerArr = res['data'].find(item => item.type === 2).peerArr;
        console.log("pco", this.peerArr);
        this.peerObject = this.peerArr.find(item => item.staffIdBy === localStorage.getItem('userId'))
        console.log("po", this.peerObject);
        this.getPeerName(this.peerObject['staffIdFor']);
        console.log("yes", this.peerArr);
      }
    }, err => {

    })
  }

  getFormDetailsByRole() {
    this.commonService.getFormDetailsByRole().subscribe(res => {
      if (res['data']) {
        this.nonTeachingPeerForm = res['data'].find(item => item.type === 5);
        let totalTopics = this.nonTeachingPeerForm.quesArr;
        if (totalTopics) {
          totalTopics.forEach(item => {
            this.totalQuestions = this.totalQuestions + item.questions.length
          })
        }
        console.log("tQ", this.totalQuestions);

        console.log("tt", this.nonTeachingPeerForm);
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  // getFormDetailsByRole() {
  //   this.commonService.getFormDetailsByRole().subscribe(res => {
  //     if (res['data']) {
  //       this.nonTeachingPeerForm = res['data'].find(item => item.type === 5);
  //       let totalTopics = this.nonTeachingPeerForm.quesArr;
  //       if (totalTopics) {
  //         totalTopics.forEach(item => {
  //           this.totalQuestions = this.totalQuestions + item.questions.length
  //         })
  //       }
  //       console.log("tQ", this.totalQuestions);

  //       console.log("tt", this.nonTeachingPeerForm);
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
      type: 5
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


  submitPeerEvaluation() {
    let tot = this.answers.map(item=>{
      this.totalMarks = this.totalMarks + item.answer;
      return this.totalMarks;
    })

    if(tot){
    let staffData = {
      staffId: localStorage.getItem('userId'),
      formType: 5,
      answers: this.answers,
      totalMarks: this.totalMarks
    }
    this.commonService.updateAnswers(staffData).subscribe(res => {
      if (res['data']) {
        this.peerFormDisplay = false;
        this.totalMarks = 0;
        console.log("ansers_res", res);
      }
    },
      err => {
        console.log("answer_error", err);
      })
  }
}

// submitPeerEvaluation() {
//     let staffData = {
//       staffId: localStorage.getItem('userId'),
//       formType: 5,
//       answers: this.answers
//     }
//     this.commonService.updateAnswers(staffData).subscribe(res => {
//       if (res['data']) {
//         this.peerFormDisplay = false;
//         console.log("ansers_res", res);
//       }
//     },
//       err => {
//         console.log("answer_error", err);
//       })
//   }


}
