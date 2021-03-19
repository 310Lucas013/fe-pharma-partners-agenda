import {AppointmentType} from './appointment-type';
import {ReasonType} from './reason-type';

export class Appointment {
  id: number;
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
}
