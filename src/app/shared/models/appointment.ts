import {AppointmentType} from './appointment-type';
import {ReasonType} from './reason-type';

export class Appointment {
  id: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  appointmentType: AppointmentType;
  reasonType: ReasonType;
  reason: string;
  attention: string;
  employeeId: number;
  patientId: number;
  locationId: number;
  priority: boolean;
  mgn: boolean;

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


  constructor(id: number, date: Date, startTime: Date, endTime: Date, appointmentType: AppointmentType, reasonType: ReasonType, reason: string, attention: string, employeeId: number, patientId: number, locationId: number, priority: boolean, mgn: boolean, title: string, color: any, draggable: boolean, resizable: { beforeStart: boolean; afterEnd: boolean }, location: string, street: string, houseNumber: string, zipCode: string, city: string, country: string, doctorName: string, patientName: string, patientStreetNameNumber: string, patientDateOfBirth: string, patientPostalCode: string) {
    this.id = id;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.appointmentType = appointmentType;
    this.reasonType = reasonType;
    this.reason = reason;
    this.attention = attention;
    this.employeeId = employeeId;
    this.patientId = patientId;
    this.locationId = locationId;
    this.priority = priority;
    this.mgn = mgn;
    this.title = title;
    this.color = color;
    this.draggable = draggable;
    this.resizable = resizable;
    this.location = location;
    this.street = street;
    this.houseNumber = houseNumber;
    this.zipCode = zipCode;
    this.city = city;
    this.country = country;
    this.doctorName = doctorName;
    this.patientName = patientName;
    this.patientStreetNameNumber = patientStreetNameNumber;
    this.patientDateOfBirth = patientDateOfBirth;
    this.patientPostalCode = patientPostalCode;
  }
}
