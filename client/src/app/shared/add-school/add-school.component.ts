import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {

  schoolData = [{
    schoolName:"Delhi Public School",
    location:"ghaziabad",
    staffEmail:"delhi@gmail.com"
  },
{
  schoolName:"chabildas public school",
    location:"Patel Nagar",
    staffEmail:"chabildas@gmail.com"
},
{
  schoolName:"chabildas public school",
    location:"Patel Nagar",
    staffEmail:"chabildas@gmail.com"
},
{
  schoolName:"chabildas public school",
    location:"Patel Nagar",
    staffEmail:"chabildas@gmail.com"
},
{
  schoolName:"chabildas public school",
    location:"Patel Nagar",
    staffEmail:"chabildas@gmail.com"
}]


  schoolForm = {
    schoolName: '',
    staffEmail:'',
    location:''
  }



  constructor() { }

  ngOnInit() {
  }

  addSchool(scForm) {
    let schoolData = {
    schoolName:scForm.form.value.schoolName,
    location:scForm.form.value.location,
    staffEmail:scForm.form.value.staffEmail
    }

    this.schoolData.push(schoolData);
    scForm.reset();
    console.log("test",scForm);
  }



}
