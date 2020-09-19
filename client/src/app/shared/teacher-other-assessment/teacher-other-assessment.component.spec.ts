import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherOtherAssessmentComponent } from './teacher-other-assessment.component';

describe('TeacherOtherAssessmentComponent', () => {
  let component: TeacherOtherAssessmentComponent;
  let fixture: ComponentFixture<TeacherOtherAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherOtherAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherOtherAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
