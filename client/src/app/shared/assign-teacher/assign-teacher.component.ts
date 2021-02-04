import { AppConfig } from './../config/app.config';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';
@Component({
  selector: 'app-assign-teacher',
  templateUrl: './assign-teacher.component.html',
  styleUrls: ['./assign-teacher.component.css']
})
export class AssignTeacherComponent implements OnInit {
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  isEdit: boolean = false;
  showPeerData: any = [];
  staffTypeArr = AppConfig.staffType;
  staffCategoryArr: any = [];
  staffData: any = [];
  staffData2: any = [];
  reviewFormData: any = [];
  filterStaffData: any = [];
  filterPeerList: any = [];
  peerUpdateArr: any[];
  showSelect = false;
  nowteachDisplay = false;
  nownonteachDisplay = false;
  isTeaching: boolean = null;
  isSelectedAll: boolean = false;
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
        this.commonService.updateStaffPeerStatus(peerArr).subscribe(response => {
          console.log("respo", response);
          let st = this.showPeerData.filter((v,i,a)=>a.findIndex(t=>(t.by === v.by))===i)
          this.showPeerData = [];
          this.showPeerData= st;
        }, error => {
          console.log("errpr", error);
        })
        this.filterStaffData = [];
        this.filterPeerList = [];
        this.peerUpdateArr = [];

        this.closeBtn.nativeElement.click();
        console.log("res", res);
      }, err => {
        console.log("Erere", err);
      })

      console.log("pa", peerArr);

    }

  }




  getStaffList() {
    this.commonService.getStaffList().subscribe(res => {
      if (res['data']) {
        this.staffData = res['data'].filter(item => item.isPrincipal === false && item.isReviewing === false);
        this.staffData2 = res['data'].filter(item => item.isPrincipal === false);
        if (this.staffData2) {
         this.getFormList()
        }
        //  this.showPeerData = res['data'].filter(item=> item.isPrincipal === false && item.isReviewing === true);
        this.filterPeerList = this.staffData;
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  getFormList() {
    this.commonService.getFormDetails().subscribe(res => {
      console.log("res", res, res['data']);
      if (res['data']) {
        this.reviewFormData = res['data'];
        this.reviewFormData.forEach(item => {
          item.peerArr.forEach(it => {
            let str = this.staffData2.filter(i => i._id === it.staffIdBy);
            let str1 = this.staffData2.filter(i => i._id === it.staffIdFor);
            console.log("str", str, "str1", str1, "staffData2", this.staffData2);
            if (str.length > 0 && str1.length > 0) {
              this.showPeerData.push({ by: str[0].name, for: str1[0].name })
            }

          })
        })
        console.log("rd", this.showPeerData);
      }
    }, err => {
      console.log("Erere", err);
    })
  }

  onSelectClick(stid, ind) {
    console.log("this", this.filterPeerList);
    this.filterPeerList = [];
    // this.selIndex = ind;
    // this.filterPeerList = this.filterStaffData;
    this.filterStaffData.forEach(item => {
      let check = false;
      this.peerUpdateArr.forEach(it => {
        console.log("yyu", item._id, it.staffIdFor);
        if (item._id == it.staffIdFor) {
          check = true
        }

      })
      if (check == false && item._id !== stid) {
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



  // left dropdown
  onStaffTypeChange(event) {

    console.log("teach", event);
    this.peeredStaffForm.staffCategory = '';
    if (event == "Teaching") {
      this.isTeaching = true;
      this.filterStaffData = this.nowteachDisplay == true ? this.staffData.filter(item => item.isTeaching === true) : [];
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

  // right dropdown
  onStaffcategoryChange(event) {
    if (this.isTeaching) {
      this.nownonteachDisplay = true;
      this.nownonteachDisplay = false;
      this.filterStaffData = this.staffData.filter(item => item.teacherCategory === event);
      this.filterPeerList = this.filterStaffData;

    } else {
      this.nownonteachDisplay = true;
      this.nowteachDisplay = false;
      this.filterStaffData = this.staffData.filter(item => item.staffArea === event);
      this.filterPeerList = this.filterStaffData;
    }

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
    this.isSelectedAll = !this.isSelectedAll;
    if (this.filterStaffData.every(val => val.checked == true)) {
      this.filterStaffData.forEach(val => { val.checked = false });
    }

    else {
      this.filterStaffData.forEach(val => { val.checked = true });
    }
    if (this.isSelectedAll) {
      this.peerUpdateArr.forEach((item, index) => {
        this.peerUpdateArr[index].isChecked = true;
      })
    }

    if (!this.isSelectedAll) {
      this.peerUpdateArr.forEach((item, index) => {
        this.peerUpdateArr[index].isChecked = false;
      })
    }

  }

  onClose() {
    this.closeBtn.nativeElement.click();
  }


}
