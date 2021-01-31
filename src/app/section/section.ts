import { Question } from '../question/question';

export interface Section {
  description?: string;
  displayed?: boolean;
  hide?: boolean;
  defaultDisable?: boolean;
  disable?: boolean; // Reserved word, do not define
  key?: string;
  name?: string;
  order?: number;
  index?: number;
  progress?: number;
  questions: Question[];
  selected?: boolean;
}
