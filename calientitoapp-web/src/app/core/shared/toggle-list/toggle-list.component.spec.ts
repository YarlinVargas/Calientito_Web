import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleListComponent } from './toggle-list.component';

describe('ToggleListComponent', () => {
  let component: ToggleListComponent;
  let fixture: ComponentFixture<ToggleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleListComponent]
    });
    fixture = TestBed.createComponent(ToggleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
