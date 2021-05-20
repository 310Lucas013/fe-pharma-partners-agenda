import {Gender} from './gender.enum';
import {Dossier} from './dossier';
import {Location} from './location';

export class Patient {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: Gender;
  dateOfBirth: Date;
  phoneNumber: string;
  dossier: Dossier;
  locationId: number;
  location: Location;
}
