import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpcRegistrationComponent } from './ppc-registration.component';

describe('PpcRegistrationComponent', () => {
  let component: PpcRegistrationComponent;
  let fixture: ComponentFixture<PpcRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpcRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpcRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
