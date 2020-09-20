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
    return this.http.post(this.commonUrl + 'login', loginDetails)
  }
}


