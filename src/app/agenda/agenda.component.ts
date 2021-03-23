import {Component, OnInit, ViewChild} from '@angular/core';
import {MainCalendarComponent} from './main-calendar/main-calendar.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  @ViewChild('main-calendar-component') mainCalendarComponent: MainCalendarComponent;

  selectedDate: Date;

  constructor() { }

  ngOnInit(): void {
  }

  dateSelectionChanged(date: Date): void {
    this.selectedDate = date;
    this.mainCalendarComponent.updatedSelectionDate();
  }

}
