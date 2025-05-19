import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilLocalSuscritoPage } from './perfil-local-suscrito.page';

describe('PerfilLocalSuscritoPage', () => {
  let component: PerfilLocalSuscritoPage;
  let fixture: ComponentFixture<PerfilLocalSuscritoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilLocalSuscritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
