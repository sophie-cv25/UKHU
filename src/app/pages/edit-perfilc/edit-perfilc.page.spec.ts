import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPerfilcPage } from './edit-perfilc.page';

describe('EditPerfilcPage', () => {
  let component: EditPerfilcPage;
  let fixture: ComponentFixture<EditPerfilcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPerfilcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
