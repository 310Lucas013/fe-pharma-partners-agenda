export interface AppointmentDto {
  //appointment service
  appointmentTypeName: string;
  startTime: Date;
  endTime: Date;
  reasonTypeName: string;
  reason: string;
  attention: string;
  //idfk
  type: string;
  date: string;
  time: string;
  duration: number;
  //employee service
  employeeId: number;
  //patient service
  patientId: number
  //location service
  location: string;
  patientStreetNameNumber: string;
  patientPostalCode: string;

  // private Long id;
  // private Date startTime;
  // private Date endTime;
  // private String description;

  // //appointmentType
  // private Long appointmentTypeId;
  // private String appointmentTypeName;
  // //reasonType
  // private Long reasonTypeId;
  // private String reasonTypeName;

  // private String reason;
  // private String attention;
}
