import {
  Component,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  EventEmitter,
  Input,
  AfterViewInit,
  AfterContentInit
} from '@angular/core';
import {CalendarEvent, CalendarEventAction} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Appointment} from '../../../shared/models/appointment';
import {AppointmentService} from 'src/app/shared/services/appointment/appointment.service';
import {TokenStorageService} from '../../../shared/services/token-storage/token-storage.service';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {FormControl} from "@angular/forms";
import {DateService} from '../../../shared/services/date/date.service';

@Component({
  selector: 'app-appointment-edit-modal',
  templateUrl: './appointment-edit-modal.component.html',
  styleUrls: ['./appointment-edit-modal.component.css'],
  providers: [DatePipe]
})
export class AppointmentEditModalComponent implements OnInit, AfterContentInit {

  duration: number;
  startTime = '00:00';
  endTime = '00:00';
  appointmentDate: Date;

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

  minDate: Date;

  @Output() editAppointmentEvent = new EventEmitter<Appointment>();

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
  @Input() appointment: Appointment;

  // todo change the modal private to the modal of the parent
  constructor(private modal: NgbModal, private appointmentService: AppointmentService,
              private tokenService: TokenStorageService, private datePipe: DatePipe, private dateService: DateService) {
    this.datePipe = new DatePipe('nl');

  }

  ngAfterContentInit(): void {
    moment.locale('nl');

    this.appointmentDate = moment(this.appointment.date).toDate();
    this.date = moment(this.appointment.date).format('LT').toString();
    this.startTime = moment(this.appointment.startTime).format('LT').toString();
    this.endTime = moment(this.appointment.endTime).format('LT').toString();
  }

  ngOnInit(): void {
    this.minDate = new Date();

  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  cancelAppointment(): void {

  }

  updateAppointment(): void {
    this.appointment.dateString = this.datePipe.transform(this.appointment.event.start, 'yyyy-MM-dd');
    this.appointmentService.updateAppointment(this.appointment).subscribe(
      data => {
        console.log(data);
        //location.reload();
      },
      error => {
        console.log(error);
      }
    );
    // TODO: MAKE THIS TO UPDATE
  }

  setAppointmentTimes(): boolean {
    if (!this.startTime.includes(':') || !this.endTime.includes(':')) return false;
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

    this.appointment.date = this.dateService.convertTZ(this.appointment.date, Intl.DateTimeFormat().resolvedOptions().timeZone);
    this.appointment.startTime = this.dateService.convertTZ(this.appointment.startTime, Intl.DateTimeFormat().resolvedOptions().timeZone);
    this.appointment.endTime = this.dateService.convertTZ(this.appointment.endTime, Intl.DateTimeFormat().resolvedOptions().timeZone);

    return this.appointment.endTime > this.appointment.startTime;
  }

  deleteAppointment(): void {
    this.appointmentService.deleteAppointment(this.appointment.id).subscribe(
      data => {
        console.log(data);
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }
}
