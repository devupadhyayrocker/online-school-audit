import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.css']
})
export class AddAssessmentComponent implements OnInit {

  selfAssessment = [{
    id:"",
    question:""
  }]



  constructor() { }

  ngOnInit() {
  }


  // addQuestion(addquesForm) {
  //   let selfAssessment = {
  //   id:addquesForm.form.value.schools,
  //   staffEmail:addquesForm.form.value.staffEmail
  //   }

  //   this.selfAssessment.push(selfAssessment);
  //   addquesForm.reset();
  //   console.log("test",this.selfAssessment);
  // }

}
