export class AppointmentDto {
  //appointment service
  appointmentTypeName: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  reasonTypeName: string;
  reason: string;
  reasonSelection: string;
  attention: string;

  //employee service
  employeeId: number;

  //patient service
  patientId: number

  //location service
  location: string;

  //TODO change these to be Id's when gateway/rabbitMQ is set up
  doctorName: string;
  patientName: string;
  patientDateOfBirth: string;
  patientStreetNameNumber: string;
  patientPostalCode: string;

  constructor() {
    this.startTime = new Date();
    this.endTime = new Date();
    this.date = new Date();
    this.reason = "";
    this.attention = "";
    this.appointmentTypeName = "";
    this.doctorName = "";
    this.patientName = "";
    this.patientDateOfBirth = "";
    this.patientPostalCode = "";
    this.patientStreetNameNumber = "";
    this.reasonSelection = "";
    this.reasonTypeName = "";
    this.employeeId = null;
    this.location = null;
    this.patientId = null;
  }
}
