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

  @Output() addAppointmentEvent = new EventEmitter<Appointment>();

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

  // todo change the modal private to the modal of the parent
  constructor(private modal: NgbModal, private appointmentService: AppointmentService, private activedRoute: ActivatedRoute, private dateService: DateService, private dateAdapter: DateAdapter<Date>) {
    this.appointment.appointmentType = {} as AppointmentType;
    this.appointment.reasonType = {} as ReasonType;
    activedRoute.params.subscribe(params => {
      this.employeeId = +params['id'];
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

  saveAppointment(): void {
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
    console.log(this.selectedColor);
    console.log(this.appointment);


    if(!this.setAppointmentTimes()){
      this.error = "Tijden niet goed ingevuld."
      return;
    }

    this.appointment.employeeId = +this.employeeId;
    // TODO set patient and location if from respective services
    if (this.appointment.employeeId === null || this.appointment.employeeId === undefined) {
      this.error = "Medewerker onbekend."
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

      let startHours = Number(this.startTime.split(':')[0]);
      let startMin = Number(this.startTime.split(':')[1]);
      let endHours = Number(this.endTime.split(':')[0]);
      let endMin = Number(this.endTime.split(':')[1]);
      this.appointment.startTime = new Date(this.appointment.date);
      this.appointment.endTime = new Date(this.appointment.date);
      this.appointment.startTime.setHours(startHours);
      this.appointment.startTime.setMinutes(startMin);
      this.appointment.endTime.setHours(endHours);
      this.appointment.endTime.setMinutes(endMin);

      this.appointment.date = this.dateService.convertTZ(this.appointment.date, Intl.DateTimeFormat().resolvedOptions().timeZone)
      this.appointment.startTime = this.dateService.convertTZ(this.appointment.startTime, Intl.DateTimeFormat().resolvedOptions().timeZone)
      this.appointment.endTime = this.dateService.convertTZ(this.appointment.endTime, Intl.DateTimeFormat().resolvedOptions().timeZone)

      return this.appointment.endTime > this.appointment.startTime;
    }
  }
}
