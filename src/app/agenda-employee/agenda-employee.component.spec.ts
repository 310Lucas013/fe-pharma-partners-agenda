import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaEmployeeComponent } from './agenda-employee.component';

describe('AgendaEmployeeComponent', () => {
  let component: AgendaEmployeeComponent;
  let fixture: ComponentFixture<AgendaEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
