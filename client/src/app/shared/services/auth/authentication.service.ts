import { AppConfig } from './../../config/app.config';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
commonUrl = AppConfig.commonurl
  constructor(
    private http:HttpClient
  ) { }

  getloginData(loginDetails){
    return this.http.post(this.commonUrl + 'staff/login', loginDetails)
  }

  getadminData(loginDetails){
    return this.http.post(this.commonUrl + 'admin/login', loginDetails)
  }

  geteditorData(loginDetails){
    return this.http.post(this.commonUrl + 'editor/login', loginDetails)
  }

  getpromoterData(loginDetails){
    return this.http.post(this.commonUrl + 'school/login', loginDetails)
  }

  getCurrentRole(){
    if(localStorage.getItem('role')){
      const role = localStorage.getItem('role');
       return role
    }
     }

}


