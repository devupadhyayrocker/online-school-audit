import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPeerAssessmentComponent } from './teacher-peer-assessment.component';

describe('TeacherPeerAssessmentComponent', () => {
  let component: TeacherPeerAssessmentComponent;
  let fixture: ComponentFixture<TeacherPeerAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherPeerAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPeerAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
