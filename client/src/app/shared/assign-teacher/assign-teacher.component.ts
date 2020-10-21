import { AppConfig } from './../config/app.config';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';
@Component({
  selector: 'app-assign-teacher',
  templateUrl: './assign-teacher.component.html',
  styleUrls: ['./assign-teacher.component.css']
})
export class AssignTeacherComponent implements OnInit {
  isEdit: boolean = false;
  showPeerData: any = [];
  staffTypeArr = AppConfig.staffType;
  staffCategoryArr: any = [];
  staffData: any = [];
  reviewFormData: any = [];
  filterStaffData: any = [];
  filterPeerList: any = [];
  peerUpdateArr: any[];
  showSelect = false;
  isTeaching: boolean = null;
  idArr = {};
  selIndex: any = -1;

  peeredStaffForm = {
    teacherWhoPeer: '',
    teacherToPeer: '',
    nonteachingArea: '',
    staffCategory: '',
    staffType: ''
  }

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.peerUpdateArr = [];
    this.getStaffList();
    this.getFormList();
  }

  addpeeredStaff(asteForm) {
    let idData = this.reviewFormData.find(item => item.type === 2);
    let dbArr = this.peerUpdateArr.filter(item => item.isChecked === true);
    if (dbArr) {
      let peerArr = dbArr.map(item => {
        let peerObj = {
          staffIdBy: item.staffIdBy,
          staffIdFor: item.staffIdFor,
          reviewStatus: 'pending'
        }
        return peerObj
      })
      console.log("iddata", idData);
      let dbObj = {
        peerArr: peerArr,
        id: idData._id
      }
      this.commonService.updateReviewForm(dbObj).subscribe(res => {
        this.getFormList();
        console.log("res", res);
      }, err => {
        console.log("Erere", err);
      })

      console.log("pa", peerArr);

    }
    // let peerStaffData = {
    //   teacherWhoPeer: asteForm.form.value.teacherWhoPeer,
    //   teacherToPeer: asteForm.form.value.teacherToPeer,
    // }

    // this.peerStaffData.push(peerStaffData);
    // asteForm.reset();
  }




  getStaffList() {
    this.commonService.getStaffList().subscribe(res => {
      if (res['data']) {
        this.staffData = res['data'].filter(item => item.isPrincipal === false && item.isReviewing === false);
        this.filterPeerList = this.staffData;
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  getFormList() {
    this.commonService.getFormDetails().subscribe(res => {
      if (res['data']) {
        this.reviewFormData = res['data'];
        let modData = this.reviewFormData.forEach(item => {
          item.peerArr.forEach(it => {
            let str = this.staffData.filter(i => i._id === it.staffIdBy);
            let str1 = this.staffData.filter(i => i._id === it.staffIdFor);
            this.showPeerData.push({ by: str[0].name, for: str1[0].name })
          })
        })
        console.log("rd", this.reviewFormData);
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  onSelectClick(stid, ind) {
    console.log("this", this.filterPeerList);
    this.filterPeerList =[];
    // this.selIndex = ind;
    // this.filterPeerList = this.filterStaffData;
 this.filterStaffData.forEach(item => {
      let check = false;
      this.peerUpdateArr.forEach(it => {
        console.log("yyu",item._id, it.staffIdFor);
        if (item._id == it.staffIdFor) {
          check = true
        }
      
      })
      if(check == false){
        this.filterPeerList.push(item);
        // console.log("item",item);
        // return item
      }

      check = false;
    
    })
    // console.log("fpl", fpl);
    
    // this.dropdownList.filter(o => this.subjectArr.find(o2 => o['item_text'] == o2));
    // if (this.selIndex === ind) {
    //   this.filterPeerList = this.filterStaffData.filter(item => item._id !== stid);
    // } else {

    // }

    console.log("Ev", stid);
  }

  onSelectChange(ev, staffFor, index) {
    let nameFor = this.filterStaffData.find(item => item._id === ev)
    let peerObj = {
      staffIdBy: staffFor,
      staffIdFor: ev,
      name: nameFor.name
    }
    this.peerUpdateArr[index] = peerObj;
    console.log("ev", this.peerUpdateArr);
  }




  onStaffTypeChange(event) {
    console.log("teach", event);
    this.peeredStaffForm.staffCategory = '';
    if (event == "Teaching") {
      this.isTeaching = true;
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
    if (this.isTeaching) {
      this.filterStaffData = this.staffData.filter(item => item.teacherCategory === event);
      this.filterPeerList = this.filterStaffData;

    } else {
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

  onstaffSelected(staff, index, st) {
    if (this.peerUpdateArr[index] && this.peerUpdateArr[index].isChecked) {
      this.peerUpdateArr[index].isChecked = false;
    } else {
      this.peerUpdateArr[index].isChecked = true;
    }
    console.log("staff", this.peerUpdateArr);
  }


  CheckAllOptions(optional) {
    if (this.filterStaffData.every(val => val.checked == true)) {
      this.filterStaffData.forEach(val => { val.checked = false });
    }

    else {
      this.filterStaffData.forEach(val => { val.checked = true });
    }

  }


}
