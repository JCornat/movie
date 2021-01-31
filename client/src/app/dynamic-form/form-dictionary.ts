import { FormDictionarySection } from '../dynamic-form/form-dictionary-section';
import { FormDictionaryQuestion } from '../dynamic-form/form-dictionary-question';

export interface FormDictionary {
  [key: string]: FormDictionarySection | FormDictionaryQuestion;
}
