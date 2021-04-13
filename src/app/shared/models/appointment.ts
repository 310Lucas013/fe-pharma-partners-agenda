import {AppointmentType} from './appointment-type';
import {ReasonType} from './reason-type';

export class Appointment {
  id: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  description: string;
  appointmentType: AppointmentType;
  reasonType: ReasonType;
  reason: string;
  attention: string;
  employeeId: number;
  patientId: number;
  locationId: number;


  title: string;
  color: any;
  draggable: boolean;
  resizable: {
    beforeStart: boolean,
    afterEnd: boolean
  };

  location: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  country: string;
  doctorName: string;
  patientName: string;
  patientStreetNameNumber: string;
  patientDateOfBirth: string;
  patientPostalCode: string;
}
