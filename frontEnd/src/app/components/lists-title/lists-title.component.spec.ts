import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsTitleComponent } from './lists-title.component';

describe('ListsTitleComponent', () => {
  let component: ListsTitleComponent;
  let fixture: ComponentFixture<ListsTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
