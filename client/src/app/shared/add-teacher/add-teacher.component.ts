import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

    staffForm = {
    school: '',
    staffType: '',
    nonteachingArea: '',
    teacherType: '',
    teacherCategory: '',
    classTeacher: '',
    subject: '',
    class: '',
    section: '',
    staffName: '',
    staffEmail:'',
    staffContact:''
  }



  constructor() { }

  ngOnInit() {
  }

}
