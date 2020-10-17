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
  staffCategoryArr: any = [];
  staffData: any = [];
  reviewFormData: any =[];
  filterStaffData: any = [];
  filterPeerList:any=[];
  isTeaching: boolean = null;
  idArr = [];

  peeredStaffForm = {
    teacherWhoPeer: '',
    teacherToPeer: '',
    nonteachingArea: '',
    staffCategory: '',
    staffType: ''
  }

  constructor(private commonService: CommonService) { }

  ngOnInit() {

    this.getStaffList();
    this.getFormList();
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
        this.staffData = res['data'].filter(item => item.isPrincipal === false);
        this.filterPeerList = res['data'];
         }
    }, err => {
      console.log("Erere", err);
    })
  }

  getFormList(){
    this.commonService.getFormDetails().subscribe(res => {
      if (res['data']) {
        this.reviewFormData = res['data'];
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  onSelectClick(ev,stid){
    this.filterPeerList = this.filterStaffData.filter(item => item._id !== stid);
    console.log("Ev",stid);
  }
  



  onStaffTypeChange(event) {
    console.log("teach", event);
    this.peeredStaffForm.staffCategory = '';
    if (event == "Teaching") {
      this.isTeaching =true;
      this.filterStaffData = this.staffData.filter(item => item.isTeaching === true);
      this.filterPeerList = this.filterStaffData;
      this.staffCategoryArr = AppConfig.teacherCategory;
      console.log("ff0", this.filterStaffData, this.staffData);
    }
    else {
      this.isTeaching = false;
      this.filterStaffData = this.staffData.filter(item => item.isTeaching === false);
      this.filterPeerList = this.filterStaffData;
      this.staffCategoryArr = AppConfig.nonteachingArea;
    }
  }


  onStaffcategoryChange(event) {
    if(this.isTeaching){
    this.filterStaffData = this.staffData.filter(item => item.teacherCategory === event);
    this.filterPeerList = this.filterStaffData;

    }else{
      this.filterStaffData = this.staffData.filter(item => item.staffArea === event);
      this.filterPeerList = this.filterStaffData;
    }
    //   if(event=="N.T."){
    //     this.filterStaffData = this.staffData.filter(item=> item.teacherCategory === event);

    //     console.log("ff0",this.filterStaffData,this.staffData);
    //   }
    //  else if(event=="P.R.T."){
    //   this.filterStaffData = this.staffData.filter(item=> item.teacherCategory === event);

    //     console.log("ff0",this.filterStaffData,this.staffData);
    //   }
    //  else if(event=="T.G.T."){
    //   this.filterStaffData = this.staffData.filter(item=> item.teacherCategory === event);

    //     console.log("ff0",this.filterStaffData,this.staffData);
    //   }
    //  else {
    //   this.filterStaffData = this.staffData.filter(item=> item.teacherCategory === event);

    //     console.log("ff0",this.filterStaffData,this.staffData);
    //   }
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
