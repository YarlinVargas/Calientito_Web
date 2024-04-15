import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateClientComponent } from './create-or-update-client.component';

describe('CreateOrUpdateClientComponent', () => {
  let component: CreateOrUpdateClientComponent;
  let fixture: ComponentFixture<CreateOrUpdateClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateClientComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
