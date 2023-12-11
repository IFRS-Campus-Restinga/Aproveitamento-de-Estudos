import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServantRegistrationComponent } from './servant-registration.component';

describe('ServantRegistrationComponent', () => {
  let component: ServantRegistrationComponent;
  let fixture: ComponentFixture<ServantRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServantRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServantRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
