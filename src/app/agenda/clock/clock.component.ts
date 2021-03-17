import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
currentDate: string;
currentTime: Date;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date().toDateString();
      this.currentTime = new Date();
    }, 1000);      }
}
