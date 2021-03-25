export class Appointment {
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
  date: string;
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
