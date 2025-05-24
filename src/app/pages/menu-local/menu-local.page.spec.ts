import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuLocalPage } from './menu-local.page';

describe('MenuLocalPage', () => {
  let component: MenuLocalPage;
  let fixture: ComponentFixture<MenuLocalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
