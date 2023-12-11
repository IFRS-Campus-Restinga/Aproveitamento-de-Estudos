import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnalysisComponent } from './add-analysis.component';

describe('AddAnalysisComponent', () => {
  let component: AddAnalysisComponent;
  let fixture: ComponentFixture<AddAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
