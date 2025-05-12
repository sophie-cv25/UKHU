import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeusuarioPage } from './homeusuario.page';

describe('HomeusuarioPage', () => {
  let component: HomeusuarioPage;
  let fixture: ComponentFixture<HomeusuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
