import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineRegistrationComponent } from './discipline-registration.component';

describe('DisciplineRegistrationComponent', () => {
  let component: DisciplineRegistrationComponent;
  let fixture: ComponentFixture<DisciplineRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplineRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisciplineRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
