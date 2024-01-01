import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderBy } from '@app/interface';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './sort.component.html',
})
export class SortComponent implements OnInit {
  @Input({ required: true }) orderBy!: string;
  @Output() onChange = new EventEmitter<OrderBy>();

  mediaForm!: FormGroup;

  sorts: { value: OrderBy, label: string }[] = [
    { value: OrderBy.random, label: 'Random' },
    { value: OrderBy.alphabetic, label: 'A-Z' },
    { value: OrderBy.alphabeticReverse, label: 'Z-A' },
    { value: OrderBy.chronological, label: 'Most recent' },
    { value: OrderBy.chronologicalReverse, label: 'Least recent' },
    { value: OrderBy.added, label: 'Last added' },
  ];

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.mediaForm = new FormGroup({
      orderBy: new FormControl(this.orderBy),
    });

    this.mediaForm.valueChanges.subscribe((data) => {
      this.onChange.emit(data.orderBy);
    });
  }
}
