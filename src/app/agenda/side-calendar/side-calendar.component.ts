import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';

@Component({
  selector: 'app-side-calendar',
  templateUrl: './side-calendar.component.html',
  styleUrls: ['./side-calendar.component.css']
})
export class SideCalendarComponent implements OnInit {

  @ViewChild('calendar') calendar: MatCalendar<Date>;
  selectedDate: Date;
  constructor() { }

  ngOnInit(): void {
  }

  public  dateChanged(date): void {
    // Do stuff here
    // alert(date);
  }
}
