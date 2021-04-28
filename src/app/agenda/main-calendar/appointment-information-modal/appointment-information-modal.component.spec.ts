import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentInformationModalComponent } from './appointment-information-modal.component';

describe('AppointmentInformationModalComponent', () => {
  let component: AppointmentInformationModalComponent;
  let fixture: ComponentFixture<AppointmentInformationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentInformationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentInformationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
