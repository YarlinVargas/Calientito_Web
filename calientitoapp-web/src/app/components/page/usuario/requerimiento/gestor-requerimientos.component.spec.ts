import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorRequerimientosComponent } from './gestor-requerimientos.component';

describe('GestorRequerimientosComponent', () => {
  let component: GestorRequerimientosComponent;
  let fixture: ComponentFixture<GestorRequerimientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorRequerimientosComponent]
    });
    fixture = TestBed.createComponent(GestorRequerimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
