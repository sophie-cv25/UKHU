import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalSoporteTecnicoComponent } from './modal-soporte-tecnico.component';

describe('ModalSoporteTecnicoComponent', () => {
  let component: ModalSoporteTecnicoComponent;
  let fixture: ComponentFixture<ModalSoporteTecnicoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSoporteTecnicoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSoporteTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
