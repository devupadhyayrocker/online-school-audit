import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-peer-assessment',
  templateUrl: './teacher-peer-assessment.component.html',
  styleUrls: ['./teacher-peer-assessment.component.css']
})
export class TeacherPeerAssessmentComponent implements OnInit {
  peerFormDisplay : boolean = true;
  constructor() { }

  ngOnInit() {
  }

  
  submitPeerEvaluation(event){
    this.peerFormDisplay = false;
  }

}
