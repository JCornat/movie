import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecorationInputDirective } from '@shared/decoration/input.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { DecorationButtonDirective } from '@shared/decoration/button.directive';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DecorationInputDirective,
    DecorationButtonDirective,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    DecorationInputDirective,
    DecorationButtonDirective,
  ],
})
export class SharedModule {
  //
}
