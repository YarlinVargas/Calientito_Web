import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMsjComponent } from './modal-msj.component';

describe('ModalMsjComponent', () => {
  let component: ModalMsjComponent;
  let fixture: ComponentFixture<ModalMsjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMsjComponent]
    });
    fixture = TestBed.createComponent(ModalMsjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
