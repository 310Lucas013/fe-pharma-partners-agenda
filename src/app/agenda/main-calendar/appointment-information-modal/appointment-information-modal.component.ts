import {Component, Input, OnInit} from '@angular/core';
import {AppointmentService} from '../../../shared/services/appointment/appointment.service';
import {Appointment} from '../../../shared/models/appointment';
import {AppointmentEditModalComponent} from '../appointment-edit-modal/appointment-edit-modal.component';
import {DateAdapter} from '@angular/material/core';
import {CustomDateAdapter} from '../../../shared/pipes/custom-date-adapter';

@Component({
  selector: 'app-appointment-information-modal',
  templateUrl: './appointment-information-modal.component.html',
  styleUrls: ['./appointment-information-modal.component.css'],
  providers: [{provide: DateAdapter, useClass: CustomDateAdapter }]
})
export class AppointmentInformationModalComponent implements OnInit {

  constructor(appointmentEditModal: AppointmentEditModalComponent) { }

  @Input() appointment: Appointment;

  appointmentTime: string;

  ngOnInit(): void {
    console.log(this.appointment);
  }

  edit(): void{

  }


}
