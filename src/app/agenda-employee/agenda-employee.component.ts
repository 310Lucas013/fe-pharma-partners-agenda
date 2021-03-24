import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../shared/class/employee';

@Component({
  selector: 'app-agenda-employee',
  templateUrl: './agenda-employee.component.html',
  styleUrls: ['./agenda-employee.component.css']
})
export class AgendaEmployeeComponent implements OnInit {

  employees: Employee[] ;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.http.get<Employee[]>('http://localhost:5001/employees/all').subscribe(response => this.employees = response);
  }


  agenda(id): void {
    this.router.navigate(['/agenda/:' + id]);
  }

}
