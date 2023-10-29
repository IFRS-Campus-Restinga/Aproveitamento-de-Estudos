import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsRegistrationComponent } from './requests-registration.component';

describe('RequestsRegistrationComponent', () => {
  let component: RequestsRegistrationComponent;
  let fixture: ComponentFixture<RequestsRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
