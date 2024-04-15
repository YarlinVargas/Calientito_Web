import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInputComponent } from './modal-input.component';

describe('ModalGetEmailComponent', () => {
  let component: ModalInputComponent;
  let fixture: ComponentFixture<ModalInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInputComponent]
    });
    fixture = TestBed.createComponent(ModalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
