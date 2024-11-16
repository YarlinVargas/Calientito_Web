import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorUsuariosComponent } from './gestor-usuarios.component';

describe('GestorUsuariosComponent', () => {
  let component: GestorUsuariosComponent;
  let fixture: ComponentFixture<GestorUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
