import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePerfilComponent } from './create-update-perfil.component';

describe('CreateUpdatePerfilComponent', () => {
  let component: CreateUpdatePerfilComponent;
  let fixture: ComponentFixture<CreateUpdatePerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdatePerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
