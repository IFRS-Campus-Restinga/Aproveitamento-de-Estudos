import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementRegistrationComponent } from './announcement-registration.component';

describe('AnnouncementRegistrationComponent', () => {
  let component: AnnouncementRegistrationComponent;
  let fixture: ComponentFixture<AnnouncementRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
