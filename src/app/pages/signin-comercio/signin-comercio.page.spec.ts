import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninComercioPage } from './signin-comercio.page';

describe('SigninComercioPage', () => {
  let component: SigninComercioPage;
  let fixture: ComponentFixture<SigninComercioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComercioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
