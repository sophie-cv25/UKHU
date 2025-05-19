import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilLocalNoSuscritoPage } from './perfil-local-no-suscrito.page';

describe('PerfilLocalNoSuscritoPage', () => {
  let component: PerfilLocalNoSuscritoPage;
  let fixture: ComponentFixture<PerfilLocalNoSuscritoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilLocalNoSuscritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
