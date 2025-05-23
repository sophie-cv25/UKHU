import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarLocalPage } from './editar-local.page';

describe('EditarLocalPage', () => {
  let component: EditarLocalPage;
  let fixture: ComponentFixture<EditarLocalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
