
import {AppointmentStatus} from '../models/appointment-status.enum';
import {AppointmentType} from '../models/appointment-type';
import {ReasonType} from '../models/reason-type';

export class AppointmentDto {
  id: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  reason: string;
  attention: string;
  appointmentStatus: AppointmentStatus;
  colorPrimary: string;
  colorSecondary: string;
  priority: boolean;
  mgn: boolean;

  appointmentType: AppointmentType;
  reasonType: ReasonType;

  employeeId: number;
  patientId: number;
  locationId: number;
}
