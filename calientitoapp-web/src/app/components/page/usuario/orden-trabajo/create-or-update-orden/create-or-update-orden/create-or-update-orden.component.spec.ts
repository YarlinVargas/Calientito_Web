import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateOrdenComponent } from './create-or-update-orden.component';

describe('CreateOrUpdateOrdenComponent', () => {
  let component: CreateOrUpdateOrdenComponent;
  let fixture: ComponentFixture<CreateOrUpdateOrdenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateOrdenComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
