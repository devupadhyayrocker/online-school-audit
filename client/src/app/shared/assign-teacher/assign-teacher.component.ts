import { AppConfig } from './../config/app.config';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';
@Component({
  selector: 'app-assign-teacher',
  templateUrl: './assign-teacher.component.html',
  styleUrls: ['./assign-teacher.component.css']
})
export class AssignTeacherComponent implements OnInit {

  
  staffTypeArr = AppConfig.staffType;
  staffCategoryArr : any = [];
  staffData: any = [];


   peeredStaffForm = {
    teacherWhoPeer: '',
    teacherToPeer: '',
    nonteachingArea:'',
    staffCategory: '',
    staffType: ''
  }

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    
    this.getStaffList();
  }

  // addpeeredStaff(asteForm) {
  //   let peerStaffData = {
  //     teacherWhoPeer: asteForm.form.value.teacherWhoPeer,
  //     teacherToPeer: asteForm.form.value.teacherToPeer,
  //   }

  //   this.peerStaffData.push(peerStaffData);
  //   asteForm.reset();
  // }

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
this.peeredStaffForm.staffCategory ='';
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

  onstaffSelected(staff) {
    console.log("staff", staff);
  }


  CheckAllOptions(optional) {
    if (this.staffData.every(val => val.checked == true)) {
      this.staffData.forEach(val => { val.checked = false });
    }

    else {
      this.staffData.forEach(val => { val.checked = true });
    }

  }


}
