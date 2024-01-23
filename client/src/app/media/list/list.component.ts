import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaMoreComponent } from '@app/media/more/more.component';
import { GroupMediaLimit, GroupMediaSort, GroupMedium, Medium, OrderBy } from '@app/interface';
import { MediaSortComponent } from '@app/media/sort/sort.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MediaItemComponent, MediaMoreComponent, MediaSortComponent],
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
