import { FieldConstraint } from './field-constraint';

export interface QuestionOptions<T> {
  value?: T;
  type?: string;
  key?: string;
  label?: string;
  required?: boolean;
  order?: number;
  page?: number;
  controlType?: string;
  constraints?: FieldConstraint[];
}
