import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAcademicAssessmentComponent } from './teacher-academic-assessment.component';

describe('TeacherAcademicAssessmentComponent', () => {
  let component: TeacherAcademicAssessmentComponent;
  let fixture: ComponentFixture<TeacherAcademicAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAcademicAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAcademicAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
