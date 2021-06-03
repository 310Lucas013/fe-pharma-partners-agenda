import {Component, Input, OnInit} from '@angular/core';
import {Patient} from '../shared/models/patient';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../shared/services/patient/patient.service';
import {LocationService} from '../shared/services/location/location.service';

@Component({
  selector: 'app-client-dossier',
  templateUrl: './client-dossier.component.html',
  styleUrls: ['./client-dossier.component.css']
})
export class ClientDossierComponent implements OnInit {
  id: number;
  @Input() patient: Patient

  constructor(private router: Router, private patientService: PatientService, private route: ActivatedRoute, private locationService: LocationService) {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    if(this.id != null){
      this.patientService.getById(this.id).subscribe(
        data => {
          this.patient = data;
          if (this.patient.locationId != null) {
            this.locationService.getById(this.patient.locationId).subscribe(
              data => {
                this.patient.location = data;
              },
              error => {
                console.log(error);
              });
          }
        });
    }
  }

  ngOnInit(): void {
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
