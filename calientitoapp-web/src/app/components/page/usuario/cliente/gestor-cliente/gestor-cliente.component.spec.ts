import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorClienteComponent } from './gestor-cliente.component';

describe('GestorClienteComponent', () => {
  let component: GestorClienteComponent;
  let fixture: ComponentFixture<GestorClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorClienteComponent]
    });
    fixture = TestBed.createComponent(GestorClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
