import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingfPage } from './onboardingf.page';

describe('OnboardingfPage', () => {
  let component: OnboardingfPage;
  let fixture: ComponentFixture<OnboardingfPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
