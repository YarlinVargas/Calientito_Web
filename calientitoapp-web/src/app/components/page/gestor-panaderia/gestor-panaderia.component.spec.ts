import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorPanaderiaComponent } from './gestor-panaderia.component';

describe('GestorPanaderiaComponent', () => {
  let component: GestorPanaderiaComponent;
  let fixture: ComponentFixture<GestorPanaderiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorPanaderiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorPanaderiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
