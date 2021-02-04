import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-teacher-peer-assessment',
  templateUrl: './teacher-peer-assessment.component.html',
  styleUrls: ['./teacher-peer-assessment.component.css']
})
export class TeacherPeerAssessmentComponent implements OnInit {
  peerFormDisplay: boolean = true;
  TeacherPeerForm: any = {};
  staffData: any = [];
  questions: any = [];
  peerObject = {};
  answers: any = [];
  totalQuestions = 0;
  peerName: string ="";
  totalMarks = 0;
  
  constructor(private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {
    this.getFormDetailsByRole();
    this.getStaffById();
  }



  getStaffById() {
    this.commonService.getStaffById().subscribe(res => {
      if (res['data']) {
        this.staffData = res['data'];
        if (this.staffData[0].isteachPeerSubmitted) {
          this.router.navigate(['/teacher_other_assessment']);
        }
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  getPeerName(peer){
    this.commonService.getStaffById2(peer).subscribe(res=>{
      if(res['data']){
        this.peerName = res['data'][0].name;
        console.log("res",this.peerName);
      }

    },err=>{
      console.log("err",err);
    })
  }

  getFormDetailsByRole() {
    this.commonService.getFormDetailsByRole().subscribe(res => {
      if (res['data']) {
        this.TeacherPeerForm = res['data'].find(item => item.type === 2);  
      this.peerObject = this.TeacherPeerForm.peerArr.find(item=> item.staffIdBy === localStorage.getItem('userId'))
      console.log("po",this.peerObject);
      this.getPeerName(this.peerObject['staffIdFor']);

      let totalTopics = this.TeacherPeerForm.quesArr;
        if (totalTopics) {
          totalTopics.forEach(item => {
            this.totalQuestions = this.totalQuestions + item.questions.length
          })
        }
        console.log("tQ", this.totalQuestions);

        console.log("tt", this.TeacherPeerForm);
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
      type: 2
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
      formType: 2,
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

}
