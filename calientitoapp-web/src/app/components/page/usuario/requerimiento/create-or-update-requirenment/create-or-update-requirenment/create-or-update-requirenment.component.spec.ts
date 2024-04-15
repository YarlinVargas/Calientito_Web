import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateRequirenmentComponent } from './create-or-update-requirenment.component';

describe('CreateOrUpdateRequirenmentComponent', () => {
  let component: CreateOrUpdateRequirenmentComponent;
  let fixture: ComponentFixture<CreateOrUpdateRequirenmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateRequirenmentComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateRequirenmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
