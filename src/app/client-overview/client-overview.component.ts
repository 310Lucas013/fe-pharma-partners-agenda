import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Gender} from '../shared/models/gender.enum';
import {ThirdPartyService} from '../shared/services/third-party/third-party.service';

@Component({
  selector: 'app-client-overview',
  templateUrl: './client-overview.component.html',
  styleUrls: ['./client-overview.component.css']
})
export class ClientOverviewComponent implements OnInit {

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

  constructor(private router: Router, private thirdPartyService: ThirdPartyService) {

  }

  ngOnInit(): void {
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  generateRandomInformation(): void {
    this.thirdPartyService.getRandomAdress().subscribe(data => {
      console.log(data);
      const fullAddress: string = data[0];
      const splitAddress = fullAddress.split(', ');
      const street = splitAddress[0];
      const tempStreetName = (Number)(street.split(' ')[1].slice(0, 1));
      if (tempStreetName === Number(/[0-9]/)) {
        this.streetName = street.split(' ')[0] + ' ' + street.split(' ')[1];
        this.houseNumber = street.split(' ')[2];
      } else {
        this.streetName = street.split(' ')[0];
        this.houseNumber = street.split(' ')[1];
      }
      console.log(this.streetName);
      console.log(this.houseNumber);
      this.zipCode = splitAddress[2];
      this.city = splitAddress[3];
      this.country = 'Nederland';
    });
    this.thirdPartyService.getRandomName().subscribe(name => {
      console.log(name);
      this.firstName = name[0].split(' ')[0];
      this.lastName = name[0].split(' ')[1];
      console.log(this.firstName);
      console.log(this.lastName);
    });
    const day: number = this.thirdPartyService.getRandomDay();
    const month: number = this.thirdPartyService.getRandomMonth();
    const year: number = this.thirdPartyService.getRandomYear();
    if (day !== null && month !== null && year !== null) {

      this.dateOfBirth = new Date();
      console.log(this.dateOfBirth);
      this.dateOfBirth.setFullYear(year, month, day);
      console.log(this.dateOfBirth);
    }
    this.thirdPartyService.getRandomPhoneNumber().subscribe(phoneNumber => {
      console.log(phoneNumber);
      this.phoneNumber = phoneNumber[0];
    });
    this.thirdPartyService.getRandomDossierInformation().subscribe(dossierInformation => {
      console.log(dossierInformation);
      this.dossierInformation = '';
      const allDossiers = dossierInformation.split('<br>');
      for (const dossier of allDossiers) {
        this.dossierInformation += dossier.toString();
      }
      console.log(this.dossierInformation);
    });

  }

  checkDateOfBirth(): void {
    console.log(this.dateOfBirth);
  }

}
