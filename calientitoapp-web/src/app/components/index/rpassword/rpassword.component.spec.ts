import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpasswordComponent } from './rpassword.component';

describe('RpasswordComponent', () => {
  let component: RpasswordComponent;
  let fixture: ComponentFixture<RpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpasswordComponent]
    });
    fixture = TestBed.createComponent(RpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
