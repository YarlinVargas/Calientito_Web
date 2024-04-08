import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleResultadoComponent } from './detalle-resultado.component';

describe('DetalleResultadoComponent', () => {
  let component: DetalleResultadoComponent;
  let fixture: ComponentFixture<DetalleResultadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleResultadoComponent]
    });
    fixture = TestBed.createComponent(DetalleResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
