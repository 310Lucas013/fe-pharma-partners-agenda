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
  message: string;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getEmployees();

  }

  getEmployees(): void {
    this.http.get<Employee[]>('http://localhost:5001/employees/all').subscribe(response => { if (response.length === 0){
                                                                                                        this.message = 'Er zijn geen accounts.';}
                                                                                                      else {
                                                                                                        this.message = 'Accounts:';
                                                                                                        this.employees = response;
                                                                                                      }});
  }

  test(employees: Employee[]): void{
    if (employees.length === 0){
      this.message = 'Er zijn geen accounts.';
    }
    else {
      this.employees = employees;
    }
  }


  agenda(id): void {
    this.router.navigate(['/agenda/:' + id]);
  }

}
