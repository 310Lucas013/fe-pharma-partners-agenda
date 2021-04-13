import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {addDays, addHours, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Appointment} from '../../shared/models/appointment';
import {ActivatedRoute} from '@angular/router';
import {AppointmentService} from '../../shared/services/appointment/appointment.service';
import {WeekDay} from '@angular/common';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-main-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.css']
})
export class MainCalendarComponent implements OnInit {
  @ViewChild('addModalContent', {static: true}) addModalContent: TemplateRef<any>;
  @ViewChild('editModalContent', {static: true}) editModalContent: TemplateRef<any>;

  @Input() viewDate: Date;

  view: CalendarView = CalendarView.Week;
  selectedAppointment: Appointment;

  CalendarView = CalendarView;

  id: number;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  appointments: Appointment[];

  actions: CalendarEventAction[] = [
    {
      label: '<span class="material-icons">done</span>',
      a11yLabel: 'CheckIn',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.doneEvent(event);
      }
    },
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(new Date(), 1),
      end: addHours(new Date(), 2),
      title: '08:50 P. Peterson Ik heb het gevoel alsof ik dood aan het gaan ben',
      color: colors.yellow,
      actions: this.actions,
      cssClass: 'calendar-gray',
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen = true;

  myWeekDays: WeekDay[];

  constructor(private modal: NgbModal, private route: ActivatedRoute, private appointmentService: AppointmentService) {
    this.myWeekDays = [WeekDay.Monday, WeekDay.Tuesday, WeekDay.Wednesday, WeekDay.Thursday, WeekDay.Friday];
    this.viewDate = new Date();
    this.setMonday();
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.appointmentService.getAppointmentsByEmployeeId(this.id).subscribe(app => {
      console.log(app);
      this.appointments = app;
      console.log(this.appointments);
    });
    // todo if the id is send and received comment line above, uncomment line below.
    // this.appointmentService.getAppointmentsByEmployeeId(this.id);
  }

  ngOnInit(): void {
    this.addEvent();
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

  eventTimesChanged({event, newStart, newEnd,}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    if (action === 'Edited') {
      this.modal.open(this.editModalContent, {size: 'lg'});
    } else if (action === 'Deleted') {
      this.modal.open(this.editModalContent, {size: 'lg'});
    } else {
      this.modal.open(this.addModalContent, {size: 'lg'});
    }
  }

  addEvent(): void {
    // const startTime = subDays(startOfDay(new Date()), 1);
    // const endTime = addDays(new Date(), 1);
    // const titleEvent = startTime.getHours().toString() + ':' + startTime.getMinutes().toString() + ' - ' + 'Message';
    // this.events = [
    //   ...this.events,
    //   {
    //     title: titleEvent,
    //     start: startTime,
    //     end: endTime,
    //     color: colors.red,
    //     actions: this.actions,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //   },
    // ];
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView): void {
    this.view = view;
    if (this.view === CalendarView.Week) {
      this.setMonday();
    }
  }

  resetViewDate(): void {
    this.viewDate = new Date();
    this.setMonday();
  }

  setMonday(): void {
    this.viewDate.setDate(this.viewDate.getDate() - this.viewDate.getDay() + 1);
  }

  setDayView(idk: any): void {
    this.view = CalendarView.Day;
    this.viewDate = idk.day.date;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  newAppointment(): void {
    this.modal.open(this.addModalContent, {size: 'lg'});
  }

  updatedSelectionDate(): void {
    if (this.view === CalendarView.Week) {
      this.setMonday();
    }
    this.refresh.next();
  }

  doneEvent(event: CalendarEvent): void {
    console.log(event);
    console.log('hello');
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        const startDate = event.start;
        const endDate = event.end;
        startDate.setHours(startDate.getHours() + 1);
        endDate.setHours(endDate.getHours() + 1);
        return {
          ...event,
          start: startDate,
          end: endDate,
        };
      }
      return iEvent;
    });
  }
}
