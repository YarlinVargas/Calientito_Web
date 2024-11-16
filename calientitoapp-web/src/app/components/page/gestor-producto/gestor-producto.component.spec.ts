import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorProductoComponent } from './gestor-producto.component';

describe('GestorProductoComponent', () => {
  let component: GestorProductoComponent;
  let fixture: ComponentFixture<GestorProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
