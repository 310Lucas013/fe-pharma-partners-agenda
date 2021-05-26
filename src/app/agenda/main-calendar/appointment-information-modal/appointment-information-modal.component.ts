import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Appointment} from '../../../shared/models/appointment';
import {DateAdapter} from '@angular/material/core';
import {CustomDateAdapter} from '../../../shared/pipes/custom-date-adapter';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from '../../../shared/services/date/date.service';
import {PatientService} from '../../../shared/services/patient/patient.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-appointment-information-modal',
  templateUrl: './appointment-information-modal.component.html',
  styleUrls: ['./appointment-information-modal.component.css'],
  providers: [{provide: DateAdapter, useClass: CustomDateAdapter }]
})
export class AppointmentInformationModalComponent implements OnInit {

  constructor(private modal: NgbModal, private dateService: DateService, private patientService: PatientService, private router: Router) {
  }

  @ViewChild('editModalContent', {static: true}) editModalContent: TemplateRef<any>;
  @ViewChild('confirmationModalContent', {static: true}) confirmationModalContent: TemplateRef<any>;
  @Input() appointment: Appointment;
  appointmentTime: string;
  age:number;

  ngOnInit(): void {
    this.appointment = JSON.parse(JSON.stringify(this.appointment));
    this.appointment.date = this.dateService.checkTimezones(this.appointment.date);
    this.appointment.startTime = this.dateService.checkTimezones(this.appointment.startTime);
    this.appointment.endTime = this.dateService.checkTimezones(this.appointment.endTime);
    this.patientService.getById(this.appointment.patientId).subscribe(
      data => {
        this.appointment.patient = data;
        this.CalculateAge(this.appointment.patient.dateOfBirth);
      }
    )
  }

  edit(): void {
    this.modal.dismissAll();
    this.modal.open(this.editModalContent, {size: 'lg'});
  }

  delete(){
    this.modal.open(this.confirmationModalContent, {size: 'sm'});
  }

  navigateToPatient(){
    return this.router.navigate(["clientoverview", this.appointment.patient.id])
  }

  private CalculateAge(date: Date): void {
      const timeDiff = Math.abs(Date.now() - new Date(date).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
}
