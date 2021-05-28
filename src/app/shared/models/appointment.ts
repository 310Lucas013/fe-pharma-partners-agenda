import {AppointmentType} from './appointment-type';
import {ReasonType} from './reason-type';
import {CalendarEvent} from 'angular-calendar';
import {EventAction, EventColor} from 'calendar-utils';
import {Patient} from './patient';

export class Appointment {
  id: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  appointmentType: AppointmentType;
  appointmentStatus: string;
  reasonType: ReasonType;
  reason: string;
  attention: string;
  employeeId: number;
  patientId: number;
  locationId: number;
  dateString: string;
  priority: boolean;
  mgn: boolean;
  colorPrimary: string;
  colorSecondary: string;

  patient: Patient;

  event: CalendarEvent;

  // title: string;
  //  color: any;
  // draggable: boolean;
  // resizable: {
  //   beforeStart: boolean,
  //   afterEnd: boolean
  // };

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
