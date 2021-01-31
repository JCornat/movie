import { Question } from '../question/question';

export interface FormDictionaryQuestion {
  type: 'question';
  sectionKey: string;
  value: Question;
}
