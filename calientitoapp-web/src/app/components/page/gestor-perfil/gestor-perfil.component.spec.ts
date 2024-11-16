import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorPerfilComponent } from './gestor-perfil.component';

describe('GestorPerfilComponent', () => {
  let component: GestorPerfilComponent;
  let fixture: ComponentFixture<GestorPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
