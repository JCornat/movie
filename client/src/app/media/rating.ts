import { RatingDisplay } from '@app/interface';

export const RATINGS = Object.freeze([
  { value: 6, label: 'Favourite' },
  { value: 5, label: 'Amazing' },
  { value: 4, label: 'Great' },
  { value: 3, label: 'Good' },
  { value: 2, label: 'Mediocre' },
  { value: 1, label: 'Bad' },
  { value: 'progress', label: 'In progress' },
  { value: 'todo', label: 'Todo' },
] as RatingDisplay[]);
