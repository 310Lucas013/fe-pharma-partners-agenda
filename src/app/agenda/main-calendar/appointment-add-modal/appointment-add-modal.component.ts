import {Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter, Input} from '@angular/core';
import {CalendarEvent, CalendarEventAction} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Appointment} from '../../../shared/models/appointment';
import {AppointmentService} from 'src/app/shared/services/appointment/appointment.service';
import {DatePipe} from '@angular/common';
import {timeInterval} from 'rxjs/operators';
import {TimeNumbersPipe} from 'src/app/shared/pipes/time-numbers-pipe';
import {TokenStorageService} from '../../../shared/services/token-storage/token-storage.service';
import {AppointmentType} from '../../../shared/models/appointment-type';
import {ReasonType} from '../../../shared/models/reason-type';

@Component({
  selector: 'app-appointment-add-modal',
  templateUrl: './appointment-add-modal.component.html',
  styleUrls: ['./appointment-add-modal.component.css']
})
export class AppointmentAddModalComponent implements OnInit {
  employeeId: number;
  startTime = '00:00';
  endTime = '00:00';
  date: string;
  appointment = {} as Appointment;
  error = '' as string;

  @Output() addAppointmentEvent = new EventEmitter<Appointment>();

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  // todo change the modal private to the modal of the parent
  constructor(private modal: NgbModal, private appointmentService: AppointmentService, private tokenService: TokenStorageService) {
    this.appointment.appointmentType = {} as AppointmentType;
    this.appointment.reasonType = {} as ReasonType;
  }

  ngOnInit(): void {
    this.appointment.date = new Date();
    this.appointment.startTime = new Date();
    this.appointment.endTime = new Date();
    this.appointment.endTime.setTime(0);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  cancelAppointment(): void {

  }

  saveAppointment(): void {
    if(!this.setAppointmentTimes()){
      this.error = "Tijden niet goed ingevuld."
      return;
    }

    // TODO set patient and location if from respective services
    if (this.employeeId === null || this.employeeId === undefined) {
      this.employeeId = 1;
    }
    if (this.appointment.patientId === null || this.appointment.patientId  === undefined) {
      this.appointment.patientId = 1;
    }
    if (this.appointment.locationId === null || this.appointment.locationId  === undefined) {
      this.appointment.locationId = 1;
    }

    this.appointment.employeeId = this.employeeId;
    this.appointmentService.addAppointment(this.appointment).subscribe(
      data => {
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
    this.addAppointmentEvent.emit(this.appointment);
  }

  setAppointmentTimes(): boolean {
    if (this.startTime.includes(':') && this.endTime.includes(':')) {
      let startHours = Number(this.startTime.split(':')[0]);
      let startMin = Number(this.startTime.split(':')[1]);
      let endHours = Number(this.endTime.split(':')[0]);
      let endMin = Number(this.endTime.split(':')[1]);
      this.appointment.startTime = new Date();
      this.appointment.endTime = new Date();
      this.appointment.startTime.setHours(startHours);
      this.appointment.startTime.setMinutes(startMin);
      this.appointment.endTime.setHours(endHours);
      this.appointment.endTime.setMinutes(endMin);
      return this.appointment.endTime > this.appointment.startTime;
    }
  }
}
