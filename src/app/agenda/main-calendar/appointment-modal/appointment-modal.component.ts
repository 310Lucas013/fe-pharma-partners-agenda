import {Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter, Input} from '@angular/core';
import {CalendarEvent, CalendarEventAction} from 'angular-calendar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Appointment} from 'src/app/shared/models/appointment';
import {AppointmentService} from 'src/app/shared/services/appointment/appointment.service';
import {TokenStorageService} from '../../../shared/services/token-storage/token-storage.service';
import {AppointmentType} from '../../../shared/models/appointment-type';
import {ReasonType} from '../../../shared/models/reason-type';

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

  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  // todo change the modal private to the modal of the parent
  constructor(private modal: NgbModal, private appointmentService: AppointmentService, private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.appointment.date = new Date();
    this.appointment.endTime = new Date();
    this.appointment.endTime.setTime(0);
    this.appointment.appointmentType = {} as AppointmentType;
    this.appointment.reasonType = {} as ReasonType;
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  cancelAppointment(): void {

  }

  saveAppointment(): void {
    if (this.employeeId === null) {
      this.employeeId = 1;
    } else {
      this.appointment.employeeId = this.employeeId;
    }
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
  }

  //TODO split up start time
  // And endTime updates 1 tick too late
  calcEndTime(): void {
    if (this.startTime.includes(':') && this.duration != null) {
      let hours = Number(this.startTime.split(':')[0]);
      let min = Number(this.startTime.split(':')[1]);
      this.appointment.startTime = new Date();
      this.appointment.startTime = this.appointment.date;
      this.appointment.startTime.setHours(hours);
      this.appointment.startTime.setMinutes(min);
      let startTime = this.appointment.startTime.getTime();
      let tempTime: Date = this.appointment.startTime;
      tempTime.setTime(startTime + this.duration * 60000);
      this.endTime = tempTime.getHours().toString() + ':' + tempTime.getMinutes().toString();
      this.appointment.endTime.setTime(startTime + this.duration * 60000); //60000 time ticks in a minute
      console.log(this.appointment.endTime);
    }
  }

  updateEndTime(): void {
    console.log('AAAA');
  }
}
