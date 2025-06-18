import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventoSemanalPage } from './evento-semanal.page';

describe('EventoSemanalPage', () => {
  let component: EventoSemanalPage;
  let fixture: ComponentFixture<EventoSemanalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoSemanalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

