import { Injectable } from '@angular/core';
import { AppConfig } from './../../config/app.config';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CommonService {
  commonUrl = AppConfig.commonurl
  constructor(private http: HttpClient) { }

  getschoolList() {
    return this.http.get(this.commonUrl + 'school/getAllSchool')
  }


  addSchool(schoolDetails) {
    return this.http.post(this.commonUrl + 'school/addSchool', schoolDetails)
  }

  updateSchool(schoolDetails) {
    return this.http.post(this.commonUrl + 'school/updateSchool', schoolDetails)
  }

  deleteSchool(schoolDetails) {
    return this.http.post(this.commonUrl + 'school/deleteSchool', schoolDetails)
  }

  addPrincipal(principalDetails) {
    return this.http.post(this.commonUrl + 'staff/addPrincipal', principalDetails)
  }

  updatePrincipal(principalDetails) {
    return this.http.post(this.commonUrl + 'staff/updatePrincipal', principalDetails)
  }

  updateStaff(staffDetails) {
    return this.http.post(this.commonUrl + 'staff/updateStaff', staffDetails)
  }


  deletePrincipal(principalDetails) {
    return this.http.post(this.commonUrl + 'staff/deletePrincipal', principalDetails)
  }

  getPrincipalList() {
    return this.http.get(this.commonUrl + 'staff/getPrincipalList')
  }

  getPrincipalBySchoolId() {
    let schoolObj = {
      schoolId: localStorage.getItem('schoolId')
    }
    return this.http.post(this.commonUrl + 'staff/getPrincipalBySchoolId', schoolObj)
  }

  getStaffList() {
    let schoolObj = {
      schoolId: localStorage.getItem('schoolId')
    }
    return this.http.post(this.commonUrl + 'staff/getStaffList', schoolObj)
  }

  getStaffList2(schoolId) {
    let schoolObj = {
      schoolId: schoolId
    }
    return this.http.post(this.commonUrl + 'staff/getStaffList', schoolObj)
  }

  getAdminStaffList() {
    return this.http.get(this.commonUrl + 'staff/getAdminStaffList')
  }

  addStaff(staffDetails) {
    return this.http.post(this.commonUrl + 'staff/addStaff', staffDetails)
  }


  updateAnswers(staffDetails) {
    return this.http.post(this.commonUrl + 'staff/updateAnswers', staffDetails)
  }

 updateStaffPeerStatus(staffDetails) {
    return this.http.post(this.commonUrl + 'staff/updatepeerStatus', staffDetails)
  }

  addreviewForm(reviewDetails) {
    return this.http.post(this.commonUrl + 'review/addReviewForm', reviewDetails)
  }

  updatePrincipalSubmission(staffDetails) {
    return this.http.post(this.commonUrl + 'staff/updatePrincipalSubmission', staffDetails)
  }

  updateEditorSubmission(staffDetails) {
    return this.http.post(this.commonUrl + 'editor/updateEditorSubmission', staffDetails)
  }

  getEditorReviews() {
    let staffData = {
      staffId: localStorage.getItem('userId')
    }
    return this.http.post(this.commonUrl + 'editor/getEditorReviews', staffData)
  }

  updateReviewForm(reviewDetails) {
    return this.http.post(this.commonUrl + 'review/updateReviewForm', reviewDetails)
  }

  getFormDetails() {
    return this.http.get(this.commonUrl + 'review/getReviewForm')
  }

  getFormDetailsByRole() {
    let fD={
      role: localStorage.getItem('role')
    }
    return this.http.post(this.commonUrl + 'review/getFormDetailsByRole',fD)
  }
  getStaffById() {
    let fD={
      staffId: localStorage.getItem('userId')
    }
    return this.http.post(this.commonUrl + 'staff/getStaffById',fD)
  }

  getStaffById2(id) {
    let fD={
      staffId: id
    }
    return this.http.post(this.commonUrl + 'staff/getStaffById',fD)
  }

  sendMail(staffDetails) {
    return this.http.post(this.commonUrl + 'staff/sendMail', staffDetails)
  }


  deleteStaff(staffDetails) {
    return this.http.post(this.commonUrl + 'staff/deleteStaff', staffDetails)
  }

}
