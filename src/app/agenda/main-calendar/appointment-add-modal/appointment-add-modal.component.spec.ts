import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentAddModalComponent } from './appointment-add-modal.component';

describe('AppointmentModalComponent', () => {
  let component: AppointmentAddModalComponent;
  let fixture: ComponentFixture<AppointmentAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
