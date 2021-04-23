import { Component, OnInit } from '@angular/core';
import {AppointmentService} from '../../../shared/services/appointment/appointment.service';

@Component({
  selector: 'app-appointment-information-modal',
  templateUrl: './appointment-information-modal.component.html',
  styleUrls: ['./appointment-information-modal.component.css']
})
export class AppointmentInformationModalComponent implements OnInit {

  constructor(private appointmentservice: AppointmentService) { }

  test: any = 'hello you';

  appointmentTime: string;

  ngOnInit(): void {

  }

  appointmentInformation(): void{
  }


}
