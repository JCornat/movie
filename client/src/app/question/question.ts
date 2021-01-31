import { SafeHtml } from '@angular/platform-browser';

import { ActionRule } from './action-rule';
import { ValidationRule } from './validation-rule';

export interface Question {
  key: string;
  type: string;
  marginBottom?: number;
  required?: boolean;
  focus?: boolean;
  hide?: boolean;
  defaultDisable?: boolean;
  disable?: boolean; // Reserved word, do not define
  readOnly?: string;
  inline?: boolean;
  forceAnswerDisplay?: boolean;
  columnSize?: string;
  label?: string;
  placeholder?: string;
  description?: string;
  sanitizedContent?: SafeHtml; // Reserved word, do not use
  validationRules?: Array<ValidationRule>;
  actionRules?: Array<ActionRule>;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  alt?: string;
  width?: number;
  height?: number;
  skin?: string;
  nowShortcut?: boolean;
  searchApi?: string;
  tag?: string;
  content?: string;
  values?: Array<{ value: string | number, label?: string }>;
  shortcuts?: Array<{ value: string | number, label: string }>;
  answerDisplay?: { hideLabel?: boolean, label?: string, noLineBreak?: boolean };
  linkExternalData?: { distantColumn: string, distantDatabase: string, distantTable: string, distantType: string, id: number };
  error?: string; // This field musn't be initialized, reserved for errors
}
