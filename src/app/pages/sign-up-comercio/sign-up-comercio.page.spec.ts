import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComercioPage } from './sign-up-comercio.page';

describe('SignUpComercioPage', () => {
  let component: SignUpComercioPage;
  let fixture: ComponentFixture<SignUpComercioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComercioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
