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
    // const appointment = new Appointment();
    // this.addAppointmentEvent.emit(appointment);
    // const appointment = new Appointment();
    // this.editAppointmentEvent.emit(appointment);

    console.log('new appointment');
    console.log(this.appointment);
    this.appointmentService.addAppointment(this.appointment).subscribe(
      data => {
        console.log(data);
        // location.reload();
      },
      error => {
        console.log(error);
      }
    );
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
      if(this.appointment.date === null || this.appointment.date === undefined){
        this.appointment.date = new Date();
      }

      this.appointment.startTime = this.appointment.date;
      this.appointment.startTime.setHours(hours);
      this.appointment.startTime.setMinutes(min);
      this.appointment.endTime.setTime(this.appointment.startTime.getTime() + this.duration * 60000); // 60000 time ticks in a minute
      this.endTime = this.appointment.endTime.getHours().toString() + ':' + this.appointment.endTime.getMinutes().toString();
      this.appointment.startTime.setHours(this.appointment.startTime.getHours() + 2)
      this.appointment.endTime.setHours(this.appointment.endTime.getHours() + 2)
      console.log(this.appointment.startTime.getTimezoneOffset());
      console.log(this.appointment.endTime);

/*      //Create Date object from ISO string
      let date = new Date(value);
      //Get ms for date
      let time = date.getTime();
      //Check if timezoneOffset is positive or negative
      if (date.getTimezoneOffset() <= 0) {
        //Convert timezoneOffset to hours and add to Date value in milliseconds
        let final = time + (Math.abs(date.getTimezoneOffset() * 60000));
        //Convert from milliseconds to date and convert date back to ISO string
        this._date = new Date(final).toISOString();
      } else {
        let final = time + (-Math.abs(date.getTimezoneOffset() * 60000));
        this._date = new Date(final).toISOString();
      }
      */
    }
  }

  updateEndTime(): void {
    console.log('AAAA');
  }
}
