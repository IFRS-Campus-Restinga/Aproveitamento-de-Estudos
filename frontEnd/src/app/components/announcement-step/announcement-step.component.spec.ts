import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementStepComponent } from './announcement-step.component';

describe('AnnouncementStepComponent', () => {
  let component: AnnouncementStepComponent;
  let fixture: ComponentFixture<AnnouncementStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
