import { Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter, Input } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from 'src/app/shared/models/appointment';
import { AppointmentService } from 'src/app/shared/services/appointment/appointment.service';
import { TokenStorageService } from '../../../shared/services/token-storage/token-storage.service';
import { AppointmentType } from '../../../shared/models/appointment-type';
import { ReasonType } from '../../../shared/models/reason-type';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})
export class AppointmentModalComponent implements OnInit {

  duration: number;
  startTime: string = '00:00';
  endTime: string = '00:00';
  appointment = {} as Appointment;
  @Input() employeeId;
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

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  // todo change the modal private to the modal of the parent
  constructor(private modal: NgbModal, private appointmentService: AppointmentService, private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.appointment.date = new Date();
    this.appointment.endTime = new Date();
    this.appointment.endTime.setTime(0);
    this.appointment.appointmentType = {} as AppointmentType;
    this.appointment.reasonType = {} as ReasonType;
    this.appointment.attention = '';
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  cancelAppointment(): void {

  }

  saveAppointment(): void {
    if(!this.setAppointmentTimes()){
      // EndTime is not later than startTime, Show error
      return;
    }
    if (this.employeeId === null || this.employeeId === undefined) {
      this.employeeId = 1;
    }
    this.appointment.employeeId = this.employeeId;
    console.log(this.appointment);
    this.appointmentService.addAppointment(this.appointment).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    this.addAppointmentEvent.emit(this.appointment);
    //location.reload();
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
