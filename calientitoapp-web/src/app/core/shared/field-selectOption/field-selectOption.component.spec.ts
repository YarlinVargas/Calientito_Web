import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSelectComponent } from './field-selectOption.component';

describe('FieldSelectComponent', () => {
  let component: FieldSelectComponent;
  let fixture: ComponentFixture<FieldSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldSelectComponent]
    });
    fixture = TestBed.createComponent(FieldSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
