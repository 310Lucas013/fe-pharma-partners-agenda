import {Gender} from '../models/gender.enum';

export class PatientDto {
  firstName: string;
  lastName: string;
  middleName: string;
  gender: Gender;
  dateOfBirth: Date;
  phoneNumber: string;
  dossierInformation: string;
  streetName: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  country: string;
}
