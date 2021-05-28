import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Appointment} from '../../../shared/models/appointment';
import {AppointmentService} from 'src/app/shared/services/appointment/appointment.service';
import {TokenStorageService} from '../../../shared/services/token-storage/token-storage.service';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {DateService} from '../../../shared/services/date/date.service';
import {DateAdapter} from '@angular/material/core';
import {PatientService} from '../../../shared/services/patient/patient.service';
import {LocationService} from '../../../shared/services/location/location.service';
import {ActivatedRoute} from '@angular/router';
import {AppointmentDto} from '../../../shared/dto/appointment-dto';
import {AppointmentStatus} from '../../../shared/models/appointment-status.enum';

@Component({
  selector: 'app-appointment-edit-modal',
  templateUrl: './appointment-edit-modal.component.html',
  styleUrls: ['./appointment-edit-modal.component.css'],
  providers: [DatePipe]
})
export class AppointmentEditModalComponent implements OnInit, AfterContentInit {

  startTime = '00:00';
  endTime = '00:00';
  appointmentDate: Date;
  employeeId: number;
  errorMessage: string;

  // Appointment parameters
  type: string;
  date: string;
  time: string;

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
              private tokenService: TokenStorageService, private datePipe: DatePipe, private dateService: DateService,
              private dateAdapter: DateAdapter<Date>, private patientService: PatientService, private locationService: LocationService) {
    this.datePipe = new DatePipe('nl');
    this.dateAdapter.setLocale('nl');
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
    this.patientService.getById(this.appointment.patientId).subscribe(
      data => {
        this.appointment.patient = data;
        if(this.appointment.patient.locationId != null){
          this.locationService.getById(this.appointment.patient.locationId).subscribe(
            data => {
              this.appointment.patient.location = data;
            }
          )
        }
      }
    )
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  cancelAppointment(): void {

  }

  updateAppointment(): void {
    if(!this.setAppointmentTimes()){
      this.errorMessage = "Afspraak tijden zijn niet goed ingevuld."
      return;
    }
    let dto = AppointmentEditModalComponent.setDtoFromAppointment(this.appointment)
    this.appointmentService.updateAppointment(dto).subscribe(
      data => {
        console.log(data);
        location.reload();
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
    console.log(startHours);
    console.log(startMin);
    console.log(endHours);
    console.log(endMin);
    this.appointment.date = this.dateService.convertTZ(this.appointmentDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
    this.appointment.startTime = new Date();
    this.appointment.startTime.setDate(this.appointment.date.getDate());
    this.appointment.endTime = new Date();
    this.appointment.endTime.setDate(this.appointment.date.getDate());
    this.appointment.startTime.setHours(startHours);
    this.appointment.startTime.setMinutes(startMin);
    this.appointment.endTime.setHours(endHours);
    this.appointment.endTime.setMinutes(endMin);

    console.log(this.appointment);

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

  private static setDtoFromAppointment(appointment: Appointment): AppointmentDto{
    let dto = new AppointmentDto();
    dto.id = appointment.id;
    dto.date = appointment.date;
    dto.startTime = appointment.startTime;
    dto.endTime = appointment.endTime;
    dto.reason = appointment.reason;
    dto.attention = appointment.attention;
    dto.colorPrimary = appointment.event.color.primary;
    dto.colorSecondary = appointment.event.color.secondary;
    dto.priority = appointment.priority;
    dto.mgn = appointment.mgn;

    dto.appointmentType = appointment.appointmentType;
    dto.appointmentStatus = AppointmentStatus[appointment.appointmentStatus];
    dto.reasonType = appointment.reasonType;

    dto.employeeId = appointment.employeeId;
    dto.patientId = appointment.patientId;
    dto.locationId = appointment.locationId;
    return dto;
  }
}
