import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppConfig } from "../config/app.config";
import { CommonService } from '../services/common/common.service';

@Component({
  selector: 'app-add-principal',
  templateUrl: './add-principal.component.html',
  styleUrls: ['./add-principal.component.css']
})
export class AddPrincipalComponent implements OnInit {
  @ViewChild('closeBtn', { static: false }) closeBtn: ElementRef;
  schoolData = [];
  schoolArr = AppConfig.schools;
  isEdit: boolean = false;
  principalData = []

  principalForm = {
    schools: "",
    principalName: '',
    principalEmail: '',
    principalContact: '',
  }
  schoolId: string = "";
  locationValue: string = "";


  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getSchoolList();
    this.getPrincipalList();
  }

  getSchoolList() {
    this.commonService.getschoolList().subscribe(res => {
      if (res['data']) {
        this.schoolData = res['data'];
        console.log("tt", this.schoolData);
      }
    }, err => {
      console.log("err", err);
    })
  }

  getPrincipalList() {
    this.commonService.getPrincipalList().subscribe(res => {
      if (res['data']) {
        this.principalData = res['data'];
        console.log("tt", this.principalData);
      }
    }, err => {
      console.log("err", err);
    })
  }

  onChange(id) {
    this.schoolId = id;
    let sortArr = this.schoolData.filter(item => {
      return item._id == id
    })
    this.locationValue = sortArr[0].location;
  }


  addPrincipal(prForm) {
    let principalData = {
      schoolName: prForm.form.value.schools,
      schoolId: this.schoolId,
      name: prForm.form.value.principalName,
      location: this.locationValue,
      staffEmail: prForm.form.value.principalEmail,
      contactNo: prForm.form.value.principalContact,
    }
    this.commonService.addPrincipal(principalData).subscribe(res => {
      if (res['success']) {
        this.closeBtn.nativeElement.click();
        prForm.reset();
        console.log("res", res);
        this.getPrincipalList();
      }
    }, err => {
      console.log("Err", err);
    })

  }

  updatePrincipal(principal) {
    console.log("prince", principal);
    let schoolObj = this.schoolData.filter(item=>{
      return item._id == principal.schoolId
    })

this.principalForm = {
  schools: principal.schoolId,
  principalName: principal.name,
  principalContact: principal.contactNo,
  principalEmail: principal.staffEmail
}
this.locationValue = schoolObj[0].location;
this.isEdit = true;
  }

  updatePrincipalForm(principal) {
    console.log("or",principal);
    let principalData = {
      schoolId: principal.form.value.schools,
      name: principal.form.value.principalName,
      contactNo: principal.form.value.principalContact,
      staffEmail: principal.form.value.principalEmail,
    }
    this.commonService.updatePrincipal(principalData).subscribe(res => {
      if (res['data']) {
        this.getPrincipalList();
        this.closeBtn.nativeElement.click();
        this.isEdit = false;
      }
    }, err => {
      console.log("err", err);
    })
  }

  deletePrincipal(principalId) {
    let principalData = {
      staffId: principalId._id
    }
    this.commonService.deletePrincipal(principalData).subscribe(res => {
      console.log("tees", res);
      if (res['success']) {
        this.getPrincipalList();
      }
    }, err => {
      console.log("err", err);
    })
  }

}
