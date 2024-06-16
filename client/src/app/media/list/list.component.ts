import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
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
  readonly groupMedia = input.required<GroupMedium[]>();
  readonly groupMediaLimit = input.required<GroupMediaLimit>();
  readonly groupMediaSort = input.required<GroupMediaSort>();

  readonly onUpdate = output<Medium>();
  readonly onIncreaseLimit = output<GroupMedium>();
  readonly onSort = output<{ groupMedium: GroupMedium, type: OrderBy }>();

  //region Template
  update(media: Medium) {
    this.onUpdate.emit(media);
  }

  increaseLimit(groupMedium: GroupMedium) {
    this.onIncreaseLimit.emit(groupMedium);
  }

  sort(groupMedium: GroupMedium, type: OrderBy) {
    this.onSort.emit({ groupMedium, type });
  }
  //endregion
}
