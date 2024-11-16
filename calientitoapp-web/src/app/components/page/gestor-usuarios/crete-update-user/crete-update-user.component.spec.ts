import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreteUpdateUserComponent } from './crete-update-user.component';

describe('CreteUpdateUserComponent', () => {
  let component: CreteUpdateUserComponent;
  let fixture: ComponentFixture<CreteUpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreteUpdateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreteUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
