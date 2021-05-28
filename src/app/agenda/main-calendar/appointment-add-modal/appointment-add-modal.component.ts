import {Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter, Input} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Appointment} from '../../../shared/models/appointment';
import {AppointmentService} from 'src/app/shared/services/appointment/appointment.service';
import {TokenStorageService} from '../../../shared/services/token-storage/token-storage.service';
import {AppointmentType} from '../../../shared/models/appointment-type';
import {ReasonType} from '../../../shared/models/reason-type';
import {ActivatedRoute} from '@angular/router';
import {DateService} from '../../../shared/services/date/date.service';
import {DateAdapter} from '@angular/material/core';
import {PatientService} from '../../../shared/services/patient/patient.service';
import {Patient} from '../../../shared/models/patient';

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
  selectedColor: any;
  selectedPatient: Patient;
  patientlist = [];

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
  constructor(private modal: NgbModal, private patientService: PatientService, private appointmentService: AppointmentService, private activedRoute: ActivatedRoute, private dateService: DateService, private dateAdapter: DateAdapter<Date>) {
    this.selectedPatient = new Patient();
    this.appointment.appointmentType = {} as AppointmentType;
    this.appointment.reasonType = {} as ReasonType;
    activedRoute.params.subscribe(params => {
      this.employeeId = +params.id;
    });
    this.dateAdapter.setLocale('nl');
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

  onSelectedPatient(): void{

  }

  onSearchChange(): void {
    this.patientService.getPatientsByName(this.appointment.patientName).subscribe(response => {
      this.patientlist = response as Patient[];
      console.log(this.patientlist);
    });
  }

  selectPatient(): void{
    console.log('asdsadasdasdsasaddsads');
    // this.selectedPatient = patient;
  }

  saveAppointment(): void {
    if (this.selectedColor === 'red') {
      this.appointment.colorSecondary = this.colors.red.secondary;
      this.appointment.colorPrimary = this.colors.red.primary;
    }
    if (this.selectedColor === 'blue') {
      this.appointment.colorSecondary = this.colors.blue.secondary;
      this.appointment.colorPrimary = this.colors.blue.primary;
    }
    if (this.selectedColor === 'yellow') {
      this.appointment.colorSecondary = this.colors.yellow.secondary;
      this.appointment.colorPrimary = this.colors.yellow.primary;
    }


    if (!this.setAppointmentTimes()) {
      this.error = 'Tijden niet goed ingevuld.';
      return;
    }

    this.appointment.employeeId = +this.employeeId;
    // TODO set patient and location if from respective services
    if (this.appointment.employeeId === null || this.appointment.employeeId === undefined) {
      this.error = 'Medewerker onbekend.';
      return;
    }
    if (this.appointment.patientId === null || this.appointment.patientId === undefined) {
      this.appointment.patientId = 1;
    }
    if (this.appointment.locationId === null || this.appointment.locationId === undefined) {
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

      const startHours = Number(this.startTime.split(':')[0]);
      const startMin = Number(this.startTime.split(':')[1]);
      const endHours = Number(this.endTime.split(':')[0]);
      const endMin = Number(this.endTime.split(':')[1]);
      this.appointment.startTime = new Date(this.appointment.date);
      this.appointment.endTime = new Date(this.appointment.date);
      this.appointment.startTime.setHours(startHours);
      this.appointment.startTime.setMinutes(startMin);
      this.appointment.endTime.setHours(endHours);
      this.appointment.endTime.setMinutes(endMin);

      this.appointment.date = this.dateService.convertTZ(this.appointment.date, Intl.DateTimeFormat().resolvedOptions().timeZone);
      this.appointment.startTime = this.dateService.convertTZ(this.appointment.startTime, Intl.DateTimeFormat().resolvedOptions().timeZone);
      this.appointment.endTime = this.dateService.convertTZ(this.appointment.endTime, Intl.DateTimeFormat().resolvedOptions().timeZone);

      return this.appointment.endTime > this.appointment.startTime;
    }
  }
}
