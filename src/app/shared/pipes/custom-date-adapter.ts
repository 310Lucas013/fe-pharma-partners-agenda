import {NativeDateAdapter} from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  getFirstDayOfWeek(): number {
    return 1;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    return ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
  }
}
