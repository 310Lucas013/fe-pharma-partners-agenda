import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from '../shared/services/employee/employee.service';
import {Employee} from '../shared/models/employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  employees = [] as Employee[];

  constructor(private router: Router, private employeeService: EmployeeService) {
    this.employeeService.getAllEmployees().subscribe(
      data => {
        this.employees = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
