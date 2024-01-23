import { ChangeDetectionStrategy, Component, EventEmitter, input, Output, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderBy } from '@app/interface';
import { SharedModule } from '@shared/shared.module';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './sort.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaSortComponent implements OnInit {
  @Input({ required: true }) orderBy!: string;
  @Output() onChange = new EventEmitter<OrderBy>();

  mediaForm!: FormGroup;

  sorts: { value: OrderBy, label: string }[] = [
    { value: OrderBy.random, label: 'Random' },
    { value: OrderBy.alphabetic, label: 'A-Z' },
    { value: OrderBy.alphabeticReverse, label: 'Z-A' },
    { value: OrderBy.mostRecent, label: 'Most recent' },
    { value: OrderBy.leastRecent, label: 'Least recent' },
    { value: OrderBy.lastAdded, label: 'Last added' },
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
