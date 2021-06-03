import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDossierComponent } from './client-dossier.component';

describe('ClientDossierComponent', () => {
  let component: ClientDossierComponent;
  let fixture: ComponentFixture<ClientDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
