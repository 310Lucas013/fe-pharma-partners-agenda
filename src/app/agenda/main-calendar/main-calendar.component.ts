import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {addDays, addHours, endOfMonth, isSameDay, isSameMonth, parseISO, startOfDay, subDays} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Appointment} from '../../shared/models/appointment';
import {ActivatedRoute} from '@angular/router';
import {AppointmentService} from '../../shared/services/appointment/appointment.service';
import {WeekDay} from '@angular/common';
import {EventAction, EventColor} from 'calendar-utils';
import {DateService} from '../../shared/services/date/date.service';



@Component({
  selector: 'app-main-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.css']
})
export class MainCalendarComponent implements OnInit {
  @ViewChild('addModalContent', {static: true}) addModalContent: TemplateRef<any>;
  @ViewChild('appointmentInformationModal', {static: true}) appointmentInformationModal: TemplateRef<any>;
  @ViewChild('editModalContent', {static: true}) editModalContent: TemplateRef<any>;
  @ViewChild('changeAgendaModal', {static: true}) changeAgendaModal: TemplateRef<any>;

  @Input() viewDate: Date;

  view: CalendarView = CalendarView.Week;
  selectedAppointment = {} as Appointment;

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

  events: CalendarEvent[] = [];


  activeDayIsOpen = true;

  myWeekDays: WeekDay[];

  constructor(private modal: NgbModal, private route: ActivatedRoute, private appointmentService: AppointmentService, private dateService: DateService) {
    this.myWeekDays = [WeekDay.Monday, WeekDay.Tuesday, WeekDay.Wednesday, WeekDay.Thursday, WeekDay.Friday];
    this.viewDate = new Date();
    this.setMonday();
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.appointmentService.getAppointmentsByEmployeeId(this.id).subscribe(app => {
      this.appointments = app;
      console.log(this.appointments);

      for (let i = 0; i < this.appointments.length; i++) {
        const a = this.appointments[i];
        a.event = {} as CalendarEvent;
        a.event.title = a.reason;

        a.event.start = dateService.checkTimezones(new Date(a.startTime));
        a.event.end = dateService.checkTimezones(new Date(a.endTime));
        // @ts-ignore
      //  a.event.color = new EventColor();

        const color: any = {
          color: {
            primary: a.colorPrimary,
            secondary: a.colorSecondary,
          }
        };
        a.event.color = color.color ; // TODO: save colours somewhere
       // console.log(a.color);
        a.event.cssClass = 'calendar-gray'; // TODO: save cssClass somewhere?
        a.event.resizable = {
          beforeStart: true,
          afterEnd: true,
        };
        a.event.draggable = false;
        a.event.actions = this.actions;
        this.events.push(a.event);
        this.appointments[i] = a;
      }
    });
  }

  ngOnInit(): void {
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

    for (let i = 0; i < this.appointments.length; i++) {
      // TODO: niet hardcoded
      if (JSON.stringify(this.appointments[i].event) === JSON.stringify(event)) {
        console.log('a');
        this.selectedAppointment = this.appointments[i];
        console.log(this.selectedAppointment);
        break;
      }
    }

    this.modalData = {event, action};
    if (action === 'Info') {
      this.modal.open(this.appointmentInformationModal, {size: 'lg'});
    } else if (action === 'Deleted') {
      this.modal.open(this.appointmentInformationModal, {size: 'lg'});
    } else if (action === 'Edited') {
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

  changeAgenda(): void {
    this.modal.open(this.changeAgendaModal, {size: 'lg'});
  }
}
