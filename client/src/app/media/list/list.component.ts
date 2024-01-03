import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaMoreComponent } from '@app/media/more/more.component';
import { GroupMediaLimit, GroupMediaSort, GroupMedium, Medium, OrderBy } from '@app/interface';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import * as Global from '@shared/global/global';
import { RATINGS } from '@app/media/rating';
import { MediaSortComponent } from '@app/media/sort/sort.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MediaItemComponent,
    MediaMoreComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MediaSortComponent,
  ],
  templateUrl: './list.component.html',
})
export class MediaListComponent {
  @Input({ required: true }) groupMedia!: GroupMedium[];
  @Input({ required: true }) groupMediaLimit!: GroupMediaLimit;
  @Input({ required: true }) groupMediaSort!: GroupMediaSort;

  @Output() onUpdate = new EventEmitter<Medium>();
  @Output() onIncreaseLimit = new EventEmitter<GroupMedium>();
  @Output() onSort = new EventEmitter<{ groupMedium: GroupMedium, type: OrderBy }>();

  update(media: Medium) {
    this.onUpdate.emit(media);
  }

  increaseLimit(groupMedium: GroupMedium) {
    this.onIncreaseLimit.emit(groupMedium);
  }

  sort(groupMedium: GroupMedium, type: OrderBy) {
    this.onSort.emit({ groupMedium, type });
  }
}
