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
import {AppointmentDto} from '../../../shared/dto/appointment-dto';
import {AppointmentStatus} from '../../../shared/models/appointment-status.enum';
import {Patient} from '../../../shared/models/patient';

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
  selectedColor: any;
  // Appointment parameters
  type: string;
  date: string;
  time: string;

  selectedPatient: Patient;
  patientList: Patient[];
  minDate: Date;

  @Output() editAppointmentEvent = new EventEmitter<Appointment>();

  colors: any = [
    {
      color: 'red',
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    {
      color: 'blue',
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    {
      color: 'yellow',
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    }
  ];

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
    this.appointment.patientName = this.appointment.patient.firstName + ' ' + this.appointment.patient.lastName;
    this.appointmentDate = moment(this.dateService.checkTimezones(this.appointment.date)).toDate();
    this.date = moment(this.dateService.checkTimezones(this.appointment.date)).format('LT').toString();
    this.startTime = moment(this.dateService.checkTimezones(this.appointment.startTime)).format('LT').toString();
    this.endTime = moment(this.dateService.checkTimezones(this.appointment.endTime)).format('LT').toString();

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

    if (this.selectedColor === '#FAE3E3'){
      this.appointment.colorSecondary = this.colors[0].secondary;
      this.appointment.colorPrimary = this.colors[0].primary;
    }
    if (this.selectedColor === '#D1E8FF'){
      this.appointment.colorSecondary = this.colors[1].secondary;
      this.appointment.colorPrimary = this.colors[1].primary;
    }
    if (this.selectedColor === '#FDF1BA'){
      this.appointment.colorSecondary = this.colors[2].secondary;
      this.appointment.colorPrimary = this.colors[2].primary;
    }
  console.log(this.appointment);
    this.appointmentService.updateAppointment(this.appointment).subscribe(
      data => {
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  setAppointmentTimes(): boolean {
    if (!this.startTime.includes(':') || !this.endTime.includes(':')) return false;
    let startHours = Number(this.startTime.split(':')[0]);
    let startMin = Number(this.startTime.split(':')[1]);
    let endHours = Number(this.endTime.split(':')[0]);
    let endMin = Number(this.endTime.split(':')[1]);
    this.appointment.date = this.dateService.convertTZ(this.appointmentDate, Intl.DateTimeFormat().resolvedOptions().timeZone);
    this.appointment.startTime = new Date(this.appointment.date);
    this.appointment.endTime = new Date(this.appointment.date);
    this.appointment.startTime.setHours(startHours);
    this.appointment.startTime.setMinutes(startMin);
    this.appointment.endTime.setHours(endHours);
    this.appointment.endTime.setMinutes(endMin);
    this.appointment.startTime = this.dateService.convertTZ(this.appointment.startTime, Intl.DateTimeFormat().resolvedOptions().timeZone);
    this.appointment.endTime = this.dateService.convertTZ(this.appointment.endTime, Intl.DateTimeFormat().resolvedOptions().timeZone);

    return this.appointment.endTime > this.appointment.startTime;
  }

  deleteAppointment(): void {
    this.appointmentService.deleteAppointment(this.appointment.id).subscribe(
      data => {
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

  onSelectedPatient(): void{
    this.patientService.getPatientsByName(this.appointment.patientName).subscribe(response => {
      this.patientList = response as Patient[];
      for (let i = 0; i < this.patientList.length; i++) {
        this.locationService.getById(this.patientList[i].locationId).subscribe(data => {
          this.patientList[i].location = data;
        });
      }
    });
  }

  selectPatient(patient: Patient): void{
    this.selectedPatient = patient;
    this.appointment.patient = patient;
    this.appointment.patientName = this.selectedPatient.firstName;
    if (this.selectedPatient.middleName !== null && this.selectedPatient.middleName !== undefined &&
      this.selectedPatient.middleName !== '') {
      this.appointment.patientName += ' ' + this.selectedPatient.middleName;
      this.appointment.patientName += ' ' + this.selectedPatient.lastName;
    } else {
      this.appointment.patientName += ' ' + this.selectedPatient.lastName;
    }
    this.appointment.patientDateOfBirth = String(this.selectedPatient.dateOfBirth);
    this.appointment.patientStreetNameNumber = this.selectedPatient.location.street + ' ' + this.selectedPatient.location.houseNumber;
    this.appointment.patientPostalCode = this.selectedPatient.location.zipCode;
    this.patientList = [];
  }
}
