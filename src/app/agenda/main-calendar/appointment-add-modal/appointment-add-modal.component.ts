import {Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter, Input} from '@angular/core';
import {CalendarEvent, CalendarEventAction} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Appointment} from '../../../shared/models/appointment';
import {AppointmentService} from 'src/app/shared/services/appointment/appointment.service';
import {DatePipe} from '@angular/common';
import {timeInterval} from 'rxjs/operators';
import {TimeNumbersPipe} from 'src/app/shared/pipes/time-numbers-pipe';
import {TokenStorageService} from '../../../shared/services/token-storage/token-storage.service';

@Component({
  selector: 'app-appointment-add-modal',
  templateUrl: './appointment-add-modal.component.html',
  styleUrls: ['./appointment-add-modal.component.css']
})
export class AppointmentAddModalComponent implements OnInit {

  duration: number;
  startTime = '00:00';
  endTime = '00:00';
  appointment = {} as Appointment;

  // Appointment parameters
  type: string;
  date: string;
  time: string;
  location: string;
  doctorName: string;
  patientName: string;
  patientStreetNameNumber: string;
  patientDateOfBirth: string;
  patientPostalCode: string;
  reasonSelection: string;
  reasonText: string;
  attentionLineText: string;

  isNew: boolean;

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
  }

  ngOnInit(): void {
    // this.appointment.date = new Date();
    // this.appointment.end = new Date();
    // this.appointment.end.setTime(0);
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
    const appointment = new Appointment();
    this.addAppointmentEvent.emit(appointment);
  }

  // TODO split up start time
  // And endTime updates 1 tick too late
  calcEndTime(): void {
    if (this.startTime.includes(':') && this.duration != null) {
      const hours = Number(this.startTime.split(':')[0]);
      const min = Number(this.startTime.split(':')[1]);
      // this.appointment.start = new Date();
      // this.appointment.start = this.appointment.date;
      // this.appointment.start.setHours(hours);
      // this.appointment.start.setMinutes(min);
      // const startTime = this.appointment.start.getTime();
      // const tempTime: Date = this.appointment.start;
      // tempTime.setTime(startTime + this.duration * 60000);
      // this.endTime = tempTime.getHours().toString() + ':' + tempTime.getMinutes().toString();
      // this.appointment.end.setTime(startTime + this.duration * 60000); // 60000 time ticks in a minute
      // console.log(this.appointment.end);
      this.appointment.date = new Date();
      this.appointment.startTime = new Date();
      this.appointment.startTime.setHours(hours);
      this.appointment.startTime.setMinutes(min);
      const startTime = this.appointment.startTime.getTime();
      const tempTime: Date = this.appointment.startTime;
      tempTime.setTime(startTime + this.duration * 60000);
      this.endTime = tempTime.getHours().toString() + ':' + tempTime.getMinutes().toString();
      this.appointment.endTime.setTime(startTime + this.duration * 60000); // 60000 time ticks in a minute
      console.log(this.appointment.endTime);
    }
  }

  updateEndTime(): void {
    console.log('AAAA');
  }
}
