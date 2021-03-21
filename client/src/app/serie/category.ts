import { Serie } from './serie';

export interface Category {
  label: string;
  limit: number;
  orderBy: string;
  series: Serie[];
}
