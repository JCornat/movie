import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';
import utc from 'dayjs/plugin/utc';
import isoWeek from 'dayjs/plugin/isoWeek';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
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
dayjs.extend(customParseFormat);

export type Time = Dayjs;
export type TimeCompatible = string | number | Date | Dayjs;

export function time(value?: TimeCompatible, format?: dayjs.OptionType, strict?: boolean): Time {
  return dayjs(value, format, strict);
}

export const timeSchema = z.union([
  z.string().refine((value) => value !== '0000-00-00 00:00:00'),
  z.int().min(1),
  z.date(),
  z.custom<Dayjs>((value: Dayjs) => value instanceof dayjs),
]).transform((v: TimeCompatible) => time(v))
  .refine((value) => value.isValid());

export const dateSchema = z.string()
  .refine((value) => value !== '0000-00-00')
  .transform((value) => time(value, 'YYYY-MM-DD', true))
  .refine((value) => value.isValid());
