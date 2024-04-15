import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorProductosComponent } from './gestor-productos.component';

describe('GestorProductosComponent', () => {
  let component: GestorProductosComponent;
  let fixture: ComponentFixture<GestorProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorProductosComponent]
    });
    fixture = TestBed.createComponent(GestorProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
