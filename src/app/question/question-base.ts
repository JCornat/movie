import { FieldConstraint } from './field-constraint';
import { QuestionOptions } from './question-options';

export class QuestionBase<T> {
  public value: T;
  public key: string;
  public label: string;
  public required: boolean;
  public displayed?: boolean;
  public hide?: boolean;
  public type: string;
  public title: string;
  public error: string;
  public description: string;
  public placeholder?: string;
  public page: number;
  public order: number;
  public controlType: string;
  public constraints: FieldConstraint[];
  public actionRules?: Array<{ value: string, action: string, type: string }>;
  public options?: object[];
  public apiUrl?: string;
  public answer?: string;

  constructor(options: QuestionOptions<T> = {}) {
    this.value = options.value;
    this.page = (options.page === undefined) ? 1 : options.page;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = (options.order === undefined) ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.constraints = options.constraints || [];
  }
}
