import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
})
export class MediaFilterComponent implements OnInit {
  searchForm!: FormGroup;

  @Input() searchTerm!: string;

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
      search: new FormControl(this.searchTerm),
    });

    this.searchForm.valueChanges.subscribe((data) => {
      this.onValid(data);
    });
  }
}
