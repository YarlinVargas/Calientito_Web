import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorOrdenTrabajoComponent } from './gestor-orden-trabajo.component';

describe('GestorOrdenTrabajoComponent', () => {
  let component: GestorOrdenTrabajoComponent;
  let fixture: ComponentFixture<GestorOrdenTrabajoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorOrdenTrabajoComponent]
    });
    fixture = TestBed.createComponent(GestorOrdenTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
