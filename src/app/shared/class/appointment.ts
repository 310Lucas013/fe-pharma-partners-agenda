export class Appointment {
  id: number;
  employeeId: number;
  patientId: number;
  locationId: number;

  title: string;
  start: Date;
  end: Date;
  color: any;
  draggable: boolean;
  resizable: {
    beforeStart: boolean,
    afterEnd: boolean
  };

  type: string;
  date: Date;
  time: string;
  duration: number;
  location: string;
  doctorName: string;
  patientName: string;
  patientStreetNameNumber: string;
  patientDateOfBirth: string;
  patientPostalCode: string;
  reasonSelection: string;
  reasonText: string;
  attentionLineText: string;


}
