import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePanaderiaComponent } from './create-update-panaderia.component';

describe('CreateUpdatePanaderiaComponent', () => {
  let component: CreateUpdatePanaderiaComponent;
  let fixture: ComponentFixture<CreateUpdatePanaderiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePanaderiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdatePanaderiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
