import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';
import { MovieItemComponent } from './movie/item/item.component';
import { DynamicFormGroupComponent } from './dynamic-form/group/group.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormSectionComponent } from './dynamic-form/section/section.component';
import { DynamicFormQuestionComponent } from './dynamic-form/question/question.component';
import { FieldCheckboxComponent } from './field/checkbox/checkbox.component';
import { FieldDateComponent } from './field/date/date.component';
import { FieldFileComponent } from './field/file/file.component';
import { FieldMultipleFieldComponent } from './field/multiple-field/multiple-field.component';
import { FieldNumberComponent } from './field/number/number.component';
import { FieldPasswordComponent } from './field/password/password.component';
import { FieldRadioComponent } from './field/radio/radio.component';
import { FieldRangeComponent } from './field/range/range.component';
import { FieldSelectComponent } from './field/select/select.component';
import { FieldTextareaComponent } from './field/textarea/textarea.component';
import { FieldTextComponent } from './field/text/text.component';
import { FieldTimeComponent } from './field/time/time.component';
import { FieldVideoYoutubeComponent } from './field/video-youtube/video-youtube.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { C7zFocusDirective } from './focus/focus.directive';
import { MovieAddComponent } from './movie/add/add.component';
import { MovieUpdateComponent } from './movie/update/update.component';
import { HttpClientModule } from '@angular/common/http';
import { C7zButtonComponent } from './button/button.component';
import { MovieSearchComponent } from './movie/search/search.component';
import { MovieImportComponent } from './movie/import/import.component';
import { LoginComponent } from './login/login.component';
import { SerieAddComponent } from './serie/add/add.component';
import { SerieComponent } from './serie/serie.component';
import { SerieImportComponent } from './serie/import/import.component';
import { SerieItemComponent } from './serie/item/item.component';
import { SerieSearchComponent } from './serie/search/search.component';
import { SerieUpdateComponent } from './serie/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormGroupComponent,
    DynamicFormComponent,
    DynamicFormSectionComponent,
    DynamicFormQuestionComponent,
    FieldCheckboxComponent,
    FieldDateComponent,
    FieldFileComponent,
    FieldMultipleFieldComponent,
    FieldNumberComponent,
    FieldPasswordComponent,
    FieldRadioComponent,
    FieldRangeComponent,
    FieldSelectComponent,
    FieldTextareaComponent,
    FieldTextComponent,
    FieldTimeComponent,
    C7zFocusDirective,
    FieldVideoYoutubeComponent,
    MovieComponent,
    MovieAddComponent,
    MovieImportComponent,
    MovieItemComponent,
    MovieSearchComponent,
    MovieUpdateComponent,
    C7zButtonComponent,
    LoginComponent,
    SerieComponent,
    SerieAddComponent,
    SerieImportComponent,
    SerieItemComponent,
    SerieSearchComponent,
    SerieUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
