import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BakeriesComponent } from './bakeries.component';

describe('BakeriesComponent', () => {
  let component: BakeriesComponent;
  let fixture: ComponentFixture<BakeriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BakeriesComponent]
    });
    fixture = TestBed.createComponent(BakeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
