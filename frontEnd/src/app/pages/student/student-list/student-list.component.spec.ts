import { ComponentFixture, TestBed } from '@angular/core/testing';

import { studentListComponent } from './student-list.component';

describe('studentListComponent', () => {
  let component: studentListComponent;
  let fixture: ComponentFixture<studentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ studentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(studentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
