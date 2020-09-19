import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrincipalComponent } from './add-principal.component';

describe('AddPrincipalComponent', () => {
  let component: AddPrincipalComponent;
  let fixture: ComponentFixture<AddPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
