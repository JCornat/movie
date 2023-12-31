import { Component, EventEmitter, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {
  searchForm!: FormGroup;

  @Output() onSearch = new EventEmitter<string>();

  ngOnInit(): void {
    this.buildForm();
  }

  /*-----------------------*\
          Template
  \*-----------------------*/

  onValid(data: { [key: string]: any }): void {
    this.onSearch.emit(data.search);
  }

  /*-----------------------*\
          Method
  \*-----------------------*/

  buildForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });

    this.searchForm.valueChanges.subscribe((data) => {
      this.onValid(data);
    });
  }
}
