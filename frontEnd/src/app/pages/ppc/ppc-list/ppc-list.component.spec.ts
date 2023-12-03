import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpcListComponent } from './ppc-list.component';

describe('PpcListComponent', () => {
  let component: PpcListComponent;
  let fixture: ComponentFixture<PpcListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpcListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
