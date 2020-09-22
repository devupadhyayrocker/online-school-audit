import { Component, OnInit } from '@angular/core';

import { AppConfig } from "../config/app.config";

@Component({
  selector: 'app-add-principal',
  templateUrl: './add-principal.component.html',
  styleUrls: ['./add-principal.component.css']
})
export class AddPrincipalComponent implements OnInit {


  schoolArr = AppConfig.schools;

  principalData = [{
  schools : "Delhi Public School ghaziabad",
  principalName:'principal 1',
  principalEmail: "dev@dpsg.com",
  principalContact:'9898989898',
  location: "Ghaziabad"
},

{
  schools : "Delhi Public School faridabad",
  principalName:'principal 2',
  principalEmail: "dev@dpsf.com",
  principalContact:'9898989898',
  location: "Faridabad"
}]

principalForm = {
  schools:"",
  principalName:'',
  principalEmail:'',
  principalContact:'',
  location:''

}

  constructor() { }

  ngOnInit() {
  }

  addPrincipal(prForm) {
    let principalData = {
    schools:prForm.form.value.schools,
    principalName:prForm.form.value.principalName,
    location:prForm.form.value.location,
    principalEmail:prForm.form.value.principalEmail,
    principalContact:prForm.form.value.principalContact,
    }

    this.principalData.push(principalData);
    prForm.reset();
    console.log("test",prForm);
  }

}
