import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee/employee.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Employee} from '../../../shared/models/employee';

@Component({
  selector: 'app-change-agenda-employee',
  templateUrl: './change-agenda-employee.component.html',
  styleUrls: ['./change-agenda-employee.component.css']
})
export class ChangeAgendaEmployeeComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService, private router: Router, private modal: NgbModal) {
    this.employees = [];
  }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(response => {
      this.employees = response;
    });
  }

  navigateToAgenda(employee: Employee): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['agenda', employee.id]));
    this.modal.dismissAll();
  }
}
