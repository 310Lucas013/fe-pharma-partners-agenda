import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Appointment} from '../../../shared/models/appointment';
import {DateAdapter} from '@angular/material/core';
import {CustomDateAdapter} from '../../../shared/pipes/custom-date-adapter';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-information-modal',
  templateUrl: './appointment-information-modal.component.html',
  styleUrls: ['./appointment-information-modal.component.css'],
  providers: [{provide: DateAdapter, useClass: CustomDateAdapter }]
})
export class AppointmentInformationModalComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  @ViewChild('editModalContent', {static: true}) editModalContent: TemplateRef<any>;
  @Input() appointment: Appointment;

  appointmentTime: string;

  ngOnInit(): void {
    // console.log(this.appointment);
  }

  edit(): void {
    this.modal.dismissAll();
    this.modal.open(this.editModalContent, {size: 'lg'});
  }

}
