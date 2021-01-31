export interface ActionRule {
  source?: string;
  type: string;
  value: string | number;
  errorPattern?: string;
  action: 'enable' | 'show' | 'disable' | 'hide' | 'setValue' | 'unsetValue' | '';
  target: string;
  connector?: 'or' | 'and' | '';
  operation?: string;
  linkedQuestions?: string[];
  disabled?: boolean;
}
