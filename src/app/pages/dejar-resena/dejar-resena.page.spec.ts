import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DejarResenaPage } from './dejar-resena.page';

describe('DejarResenaPage', () => {
  let component: DejarResenaPage;
  let fixture: ComponentFixture<DejarResenaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DejarResenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
