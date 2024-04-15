import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateNotificacionComponent } from './create-or-update-notificacion.component';

describe('CreateOrUpdateNotificacionComponent', () => {
  let component: CreateOrUpdateNotificacionComponent;
  let fixture: ComponentFixture<CreateOrUpdateNotificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateNotificacionComponent]
    });
    fixture = TestBed.createComponent(CreateOrUpdateNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
