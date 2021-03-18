import { Component, OnInit, Output, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { addDays, addHours, endOfMonth, startOfDay, subDays } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from 'src/app/shared/class/appointment';
import { AppointmentDto } from 'src/app/shared/dto/appointmentDto';
import { AppointmentService } from 'src/app/shared/services/appointment/appointment.service'

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})

export class AppointmentModalComponent implements OnInit {

  appointment = {} as AppointmentDto;

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
  constructor(private modal: NgbModal, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  cancelAppointment(): void {

  }

  saveAppointment(): void {
    console.log(this.appointment);
    //this.addAppointmentEvent.emit(this.appointment);
    this.appointmentService.addAppointment(this.appointment);
  }

}
