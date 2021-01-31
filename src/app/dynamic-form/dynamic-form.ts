import { Section } from '../section/section';

export interface DynamicForm {
  color?: string;
  previewSections?: string;
  enableReview?: boolean;
  noButton?: boolean;
  requiredSkipable?: boolean;
  slug?: string;
  type?: string;
  name?: string;
  url?: string;
  destination?: string;
  backgroundImage?: string;
  endMessage?: string;
  paymentId?: string;
  paymentQuestionKey?: string;
  sections: Section[];
}
