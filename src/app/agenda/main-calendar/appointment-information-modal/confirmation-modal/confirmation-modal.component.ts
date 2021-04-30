import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Appointment} from '../../../../shared/models/appointment';
import {AppointmentService} from '../../../../shared/services/appointment/appointment.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() appointment: Appointment;
  @ViewChild('appointmentInformationModal', {static: true}) informationModalContent: TemplateRef<any>;

  constructor(private modal: NgbModal, private appointmentService: AppointmentService) { }

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
    this.modal.dismissAll();
    this.modal.open(this.informationModalContent, {size: 'lg'});
  }
}
