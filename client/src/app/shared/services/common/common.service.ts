import { Injectable } from '@angular/core';
import { AppConfig } from './../../config/app.config';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CommonService {
  commonUrl = AppConfig.commonurl
  constructor(private http: HttpClient) { }

  getschoolList(){
    return this.http.get(this.commonUrl + 'school/getAllSchool')
  }


  addSchool(schoolDetails){
    return this.http.post(this.commonUrl + 'school/addSchool',schoolDetails)
  }

  updateSchool(schoolDetails){
    return this.http.post(this.commonUrl + 'school/updateSchool',schoolDetails)
  }

  deleteSchool(schoolDetails){
    return this.http.post(this.commonUrl + 'school/deleteSchool',schoolDetails)
  }

  addPrincipal(principalDetails){
    return this.http.post(this.commonUrl + 'staff/addPrincipal',principalDetails)
  }

  updatePrincipal(principalDetails){
    return this.http.post(this.commonUrl + 'staff/updatePrincipal',principalDetails)
  }

  updateStaff(staffDetails){
    return this.http.post(this.commonUrl + 'staff/updateStaff',staffDetails)
  }


  deletePrincipal(principalDetails){
    return this.http.post(this.commonUrl + 'staff/deletePrincipal',principalDetails)
  }

  getPrincipalList(){
    return this.http.get(this.commonUrl + 'staff/getPrincipalList')
  }

  getStaffList(){
    return this.http.get(this.commonUrl + 'staff/getStaffList')
  }

  addStaff(staffDetails){
    return this.http.post(this.commonUrl + 'staff/addStaff',staffDetails)
  }

  addreviewForm(reviewDetails){
    return this.http.post(this.commonUrl + 'review/addReviewForm',reviewDetails)
  }

  updateReviewForm(reviewDetails){
    return this.http.post(this.commonUrl + 'review/updateReviewForm',reviewDetails)
  }


  getFormDetails(){
    return this.http.get(this.commonUrl + 'review/getReviewForm')
  }

  getFormDetailsByRole(){
    return this.http.get(this.commonUrl + 'review/getFormDetailsByRole')
  }
  sendMail(staffDetails){
    return this.http.post(this.commonUrl + 'staff/sendMail',staffDetails)
  }

  
  deleteStaff(staffDetails){
    return this.http.post(this.commonUrl + 'staff/deleteStaff',staffDetails)
  }  

}
