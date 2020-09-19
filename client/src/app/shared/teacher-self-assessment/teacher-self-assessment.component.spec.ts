import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSelfAssessmentComponent } from './teacher-self-assessment.component';

describe('TeacherSelfAssessmentComponent', () => {
  let component: TeacherSelfAssessmentComponent;
  let fixture: ComponentFixture<TeacherSelfAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSelfAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSelfAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
