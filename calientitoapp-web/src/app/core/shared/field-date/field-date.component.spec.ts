import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDateComponent } from './field-date.component';

describe('FieldDateComponent', () => {
  let component: FieldDateComponent;
  let fixture: ComponentFixture<FieldDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldDateComponent]
    });
    fixture = TestBed.createComponent(FieldDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
