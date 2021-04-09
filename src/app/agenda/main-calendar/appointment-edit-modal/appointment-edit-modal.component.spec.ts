import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentEditModalComponent } from './appointment-edit-modal.component';

describe('AppointmentModalComponent', () => {
  let component: AppointmentEditModalComponent;
  let fixture: ComponentFixture<AppointmentEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
