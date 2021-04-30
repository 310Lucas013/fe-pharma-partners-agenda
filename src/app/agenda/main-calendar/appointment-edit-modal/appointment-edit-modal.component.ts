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
              private tokenService: TokenStorageService, private datePipe: DatePipe) {
    this.datePipe = new DatePipe('nl');

  }

  ngAfterContentInit(): void {
    // Internal Screaming Intensifies aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    moment.locale('nl');
    this.appointmentDate = moment(this.appointment.date).toDate();
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
      this.appointment.date = new Date();
      this.appointment.startTime = new Date();
      this.appointment.startTime.setHours(hours);
      this.appointment.startTime.setMinutes(min);
      // const startTime = this.appointment.start.getTime();
      // const tempTime: Date = this.appointment.start;
      const startTime = this.appointment.startTime.getTime();
      const tempTime: Date = this.appointment.startTime;
      tempTime.setTime(startTime + this.duration * 60000);
      this.endTime = tempTime.getHours().toString() + ':' + tempTime.getMinutes().toString();
      // this.appointment.end.setTime(startTime + this.duration * 60000); // 60000 time ticks in a minute
      this.appointment.endTime.setTime(startTime + this.duration * 60000); // 60000 time ticks in a minute
      // console.log(this.appointment.end);
      console.log(this.appointment.endTime);
    }
  }

  updateEndTime(): void {
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
