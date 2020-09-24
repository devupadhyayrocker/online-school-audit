import { Component, OnInit } from '@angular/core';
import { AppConfig } from "../config/app.config";
@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.css']
})
export class AddAssessmentComponent implements OnInit {

onselStaff = "";

onselAssessment = "";

formTitle="";

  assessmentObj :{
    title:'',
    questions:[],
    staffType:'',
    assessmentType:''
  }

  selectStaffArr = AppConfig.selectStaff;
  selectAssessmentArr = AppConfig.selectAssessment;
  formConfigArr = AppConfig.formConfig;

  question: any = "";

  constructor() { }

  ngOnInit() {

    this.assessmentObj = {
      title:'',
      questions:[],
      staffType:'',
      assessmentType:''
        
    }
    console.log("sel staff",this.selectStaffArr);

  }


  OnSelectStaff(event){
    this.onselStaff=event;
    console.log("staff Val",event);
  }


  OnSelectAssessment(event){

    this.onselAssessment=event;
    let matrixkey = this.onselStaff + this.onselAssessment;
    let formObj = this.formConfigArr.filter(item=>{
      return item.matrixValue === matrixkey
    })
    this.formTitle = formObj[0]['formName'];
    console.log("mat Val",event,formObj[0]);
  }
  
}
