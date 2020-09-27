import { Component, OnInit } from '@angular/core';
import { AppConfig } from './../config/app.config';
import { CommonService } from 'src/app/shared/services/common/common.service';
@Component({
  selector: 'app-principal-assessment',
  templateUrl: './principal-assessment.component.html',
  styleUrls: ['./principal-assessment.component.css']
})
export class PrincipalAssessmentComponent implements OnInit {

  staffTypeArr = AppConfig.staffType;
  staffCategoryArr : any = [];
  staffData: any = [];

  principalAssessment = {
    nonteachingArea:'',
    staffCategory: '',
    staffType: '',
    teacherToAssess:''
  }

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    
    this.getStaffList();
  }


  getStaffList() {
    this.commonService.getStaffList().subscribe(res => {
      if (res['data']) {
        this.staffData = res['data'];
      }
    }, err => {
      console.log("Erere", err);
    })
  }


  onStaffTypeChange(event){
console.log("teach",event);
this.principalAssessment.staffCategory ='';
if(event=="Teaching"){
  this.staffCategoryArr = AppConfig.teacherCategory;
}
else{
  this.staffCategoryArr = AppConfig.nonteachingArea;
}
  }
  

  onStaffcategoryChange(event){
console.log("stafftype",event);
this.staffData = this.staffData.filter(item=>{
  return item.teacherCategory == event
})

console.log("dev",this.staffData,event);  

}

}
