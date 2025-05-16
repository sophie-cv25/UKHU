import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestauranteDetallePage } from './restaurante-detalle.page';

describe('RestauranteDetallePage', () => {
  let component: RestauranteDetallePage;
  let fixture: ComponentFixture<RestauranteDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauranteDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
