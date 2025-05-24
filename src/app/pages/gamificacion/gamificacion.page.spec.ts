import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamificacionPage } from './gamificacion.page';

describe('GamificacionPage', () => {
  let component: GamificacionPage;
  let fixture: ComponentFixture<GamificacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GamificacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
