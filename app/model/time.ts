import { Dayjs, OpUnitType } from 'dayjs';
import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import isoWeek from 'dayjs/plugin/isoWeek';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/fr';

dayjs.locale('fr');
dayjs.extend(utc);
dayjs.extend(isoWeek);
dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(weekday);

export function time(value?: string | number | Date, format?: dayjs.OptionType, strict?: boolean): Time {
  return new Time(value, format, strict);
}

export class Time {
  private date: Dayjs;

  constructor(value: string | number | Date | Dayjs, format?: dayjs.OptionType, strict?: boolean) {
    this.date = dayjs(value, format, strict);
  }

  /*-----------------------*\
          Operations
  \*-----------------------*/

  add(value: number, unit: any): Time {
    const result = this.date.add(value, unit);
    return new Time(result);
  }

  subtract(value: number, unit: any): Time {
    const result = this.date.subtract(value, unit);
    return new Time(result);
  }

  diff(otherDate: Time, unit?: any, accurate?: boolean): number {
    return this.date.diff(otherDate.date, unit, accurate);
  }

  /*-----------------------*\
          Getters
  \*-----------------------*/

  /**
   * Returns the day of the week number for the current date.
   * The day scale ranges from 0 (Sunday) to 6 (Saturday).
   * @returns number The day of the week number.
   */
  day(): number {
    return this.date.day();
  }

  /**
   * Returns the day of the week number according to locale for the current date.
   * The day scale ranges from 0 (Monday) to 6 (Sunday).
   * @returns number The day of the week number.
   */
  weekday(): number {
    return this.date.weekday();
  }

  month(): number {
    return this.date.month();
  }

  year(): number {
    return this.date.year();
  }

  isoWeekday(): number {
    return this.date.isoWeekday();
  }

  daysInMonth(): number {
    return this.date.daysInMonth();
  }

  /*-----------------------*\
        Setters
  \*-----------------------*/

  startOf(unit: OpUnitType): Time {
    const result = this.date.startOf(unit);
    return new Time(result);
  }

  hours(value: number): Time {
    const result = this.date.set('hour', value);
    return new Time(result);
  }

  minutes(value: number): Time {
    const result = this.date.set('minute', value);
    return new Time(result);
  }

  seconds(value: number): Time {
    const result = this.date.set('second', value);
    return new Time(result);
  }

  milliseconds(value: number): Time {
    const result = this.date.set('millisecond', value);
    return new Time(result);
  }

  /*-----------------------*\
          Comparison
  \*-----------------------*/

  isBefore(otherDate: Time, unit?: OpUnitType): boolean {
    return this.date.isBefore(otherDate.date, unit);
  }

  isAfter(otherDate: Time, unit?: OpUnitType): boolean {
    return this.date.isAfter(otherDate.date, unit);
  }

  isSame(otherDate: Time, unit?: OpUnitType): boolean {
    return this.date.isSame(otherDate.date, unit);
  }

  isSameOrAfter(otherDate: Time, unit?: OpUnitType): boolean {
    return this.date.isSameOrAfter(otherDate.date, unit);
  }

  isSameOrBefore(otherDate: Time, unit?: OpUnitType): boolean {
    return this.date.isSameOrBefore(otherDate.date, unit);
  }

  isBetween(otherDate: Time, unit?: OpUnitType): boolean {
    return this.date.isBetween(otherDate.date, unit);
  }

  /*-----------------------*\
            Format
  \*-----------------------*/

  fromNow(withoutSuffix?: boolean): string {
    return this.date.fromNow(withoutSuffix);
  }

  format(template?: string): string {
    return this.date.format(template);
  }

  utc(date?: string | number | Date): Time {
    const utcDate = dayjs.utc(date);
    return new Time(utcDate);
  }

  toDate(): Date {
    return this.date.toDate();
  }

  /*-----------------------*\
          Other
  \*-----------------------*/

  isValid(): boolean {
    return this.date.isValid();
  }

  toString(): string {
    return this.date.toString();
  }

  valueOf(): number {
    return this.date.valueOf();
  }
}
