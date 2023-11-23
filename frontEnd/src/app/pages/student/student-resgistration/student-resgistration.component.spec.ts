import { ComponentFixture, TestBed } from '@angular/core/testing';

import { studentResgistrationComponent } from './student-resgistration.component';

describe('studentResgistrationComponent', () => {
  let component: studentResgistrationComponent;
  let fixture: ComponentFixture<studentResgistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ studentResgistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(studentResgistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
