import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Appointment} from '../../../shared/models/appointment';
import {DateAdapter} from '@angular/material/core';
import {CustomDateAdapter} from '../../../shared/pipes/custom-date-adapter';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from '../../../shared/services/date/date.service';

@Component({
  selector: 'app-appointment-information-modal',
  templateUrl: './appointment-information-modal.component.html',
  styleUrls: ['./appointment-information-modal.component.css'],
  providers: [{provide: DateAdapter, useClass: CustomDateAdapter }]
})
export class AppointmentInformationModalComponent implements OnInit {

  constructor(private modal: NgbModal, private dateService: DateService) {
  }

  @ViewChild('editModalContent', {static: true}) editModalContent: TemplateRef<any>;
  @ViewChild('confirmationModalContent', {static: true}) confirmationModalContent: TemplateRef<any>;
  @Input() appointment: Appointment;
  appointmentTime: string;

  ngOnInit(): void {
    this.appointment = JSON.parse(JSON.stringify(this.appointment));
    this.appointment.date = this.dateService.checkTimezones(this.appointment.date);
    this.appointment.startTime = this.dateService.checkTimezones(this.appointment.startTime);
    this.appointment.endTime = this.dateService.checkTimezones(this.appointment.endTime);
  }

  edit(): void {
    this.modal.dismissAll();
    this.modal.open(this.editModalContent, {size: 'lg'});
  }

  delete(){
    this.modal.open(this.confirmationModalContent, {size: 'sm'});
  }

}
