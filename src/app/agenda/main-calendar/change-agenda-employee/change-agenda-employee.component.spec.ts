import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAgendaEmployeeComponent } from './change-agenda-employee.component';

describe('ChangeAgendaEmployeeComponent', () => {
  let component: ChangeAgendaEmployeeComponent;
  let fixture: ComponentFixture<ChangeAgendaEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAgendaEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAgendaEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
