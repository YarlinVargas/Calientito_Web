import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateProductoComponent } from './create-update-producto.component';

describe('CreateUpdateProductoComponent', () => {
  let component: CreateUpdateProductoComponent;
  let fixture: ComponentFixture<CreateUpdateProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
