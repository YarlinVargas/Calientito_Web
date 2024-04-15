import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExamComponent } from './card-exam.component';

describe('CardExamComponent', () => {
  let component: CardExamComponent;
  let fixture: ComponentFixture<CardExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardExamComponent]
    });
    fixture = TestBed.createComponent(CardExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
