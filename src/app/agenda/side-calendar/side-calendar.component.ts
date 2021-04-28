import {Component, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {DateAdapter} from '@angular/material/core';
import {CustomDateAdapter} from '../../shared/pipes/custom-date-adapter';

@Component({
  selector: 'app-side-calendar',
  templateUrl: './side-calendar.component.html',
  styleUrls: ['./side-calendar.component.css'],
  providers: [{provide: DateAdapter, useClass: CustomDateAdapter }]
})
export class SideCalendarComponent implements OnInit {

  @ViewChild('calendar') calendar: MatCalendar<Date>;

  @Output() dateSelected = new EventEmitter<Date>();

  selectedDate: Date;
  constructor() { }

  ngOnInit(): void {
  }

  public dateChanged(date): void {
    // Do stuff here
    // alert(date);
    this.dateSelected.emit(date);
  }
}
