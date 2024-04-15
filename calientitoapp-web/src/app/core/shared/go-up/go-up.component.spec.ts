import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoUpComponent } from './go-up.component';

describe('GoUpComponent', () => {
  let component: GoUpComponent;
  let fixture: ComponentFixture<GoUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoUpComponent]
    });
    fixture = TestBed.createComponent(GoUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
