import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecorationInputDirective } from '@shared/decoration/input.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { DecorationButtonDirective } from '@shared/decoration/button.directive';
import { SharedIconComponent } from '@shared/icon/icon.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DecorationInputDirective,
    DecorationButtonDirective,
    SharedIconComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    DecorationInputDirective,
    DecorationButtonDirective,
    SharedIconComponent,
  ],
})
export class SharedModule {
  //
}
