import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorNotificacionComponent } from './gestor-notificacion.component';

describe('GestorNotificacionComponent', () => {
  let component: GestorNotificacionComponent;
  let fixture: ComponentFixture<GestorNotificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorNotificacionComponent]
    });
    fixture = TestBed.createComponent(GestorNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
