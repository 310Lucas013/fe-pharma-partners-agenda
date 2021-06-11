import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Appointment} from '../../../../shared/models/appointment';
import {AppointmentService} from '../../../../shared/services/appointment/appointment.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from '../../../../shared/services/date/date.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() appointment: Appointment;
  @ViewChild('appointmentInformationModal', {static: true}) informationModalContent: TemplateRef<any>;

  constructor(private modal: NgbModal, private appointmentService: AppointmentService, private dateService: DateService) { }

  ngOnInit(): void {
  }

  confirm(){
    this.appointmentService.deleteAppointment(this.appointment.id).subscribe(
      data => {
        this.modal.dismissAll()
        location.reload();
      },
      error => {
        console.log(error);
      }
    )
  }

  close(){
    this.appointment.startTime = this.dateService.undoTimezones(this.appointment.startTime);
    this.appointment.endTime = this.dateService.undoTimezones(this.appointment.endTime);
    this.appointment.date = this.dateService.undoTimezones(this.appointment.date);
    this.modal.dismissAll();
    this.modal.open(this.informationModalContent, {size: 'lg'});
  }
}
