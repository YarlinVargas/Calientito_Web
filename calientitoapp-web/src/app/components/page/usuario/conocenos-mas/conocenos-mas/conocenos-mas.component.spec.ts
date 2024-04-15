import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConocenosMasComponent } from './conocenos-mas.component';

describe('ConocenosMasComponent', () => {
  let component: ConocenosMasComponent;
  let fixture: ComponentFixture<ConocenosMasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConocenosMasComponent]
    });
    fixture = TestBed.createComponent(ConocenosMasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
