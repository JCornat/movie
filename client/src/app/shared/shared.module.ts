import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputDirective } from '@shared/form-input/form-input.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, FormInputDirective],
  exports: [CommonModule, ReactiveFormsModule, FormInputDirective],
})
export class SharedModule {
  //
}
