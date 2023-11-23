import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOAuthComponent } from './login-oauth.component';

describe('LoginOAuthComponent', () => {
  let component: LoginOAuthComponent;
  let fixture: ComponentFixture<LoginOAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginOAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginOAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
