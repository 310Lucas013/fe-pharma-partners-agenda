import {Component, OnInit, ViewChild} from '@angular/core';
import {MainCalendarComponent} from './main-calendar/main-calendar.component';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  @ViewChild('mainCalendarComponent') mainCalendarComponent: MainCalendarComponent;

  selectedDate: Date;

  constructor() {
    this.selectedDate = new Date();
  }

  ngOnInit(): void {
  }

  dateSelectionChanged(date: Date): void {
    this.selectedDate = date;
    setTimeout(() => {
      this.mainCalendarComponent.updatedSelectionDate();
    }, 0);
  }

}
