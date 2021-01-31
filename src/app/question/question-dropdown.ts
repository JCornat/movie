import { QuestionBase } from './question-base';

export class DropdownQuestion extends QuestionBase<string> {
  public controlType = 'select';
  public options: Array<{ key: string, value: string }> = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
