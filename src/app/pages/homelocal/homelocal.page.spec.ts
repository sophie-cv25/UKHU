import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomelocalPage } from './homelocal.page';

describe('HomelocalPage', () => {
  let component: HomelocalPage;
  let fixture: ComponentFixture<HomelocalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomelocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
