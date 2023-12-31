import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaMoreComponent } from '@app/media/more/more.component';
import { GroupMediaLimit, GroupMediaSort, GroupMedium, Medium } from '@app/interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MediaItemComponent, MediaMoreComponent, CommonModule],
  templateUrl: './list.component.html',
})
export class ListComponent {
  @Input({ required: true }) groupMedia!: GroupMedium[];
  @Input({ required: true }) groupMediaLimit!: GroupMediaLimit;
  @Input({ required: true }) groupMediaSort!: GroupMediaSort;

  @Output() onUpdate = new EventEmitter<Medium>();
  @Output() onIncreaseLimit = new EventEmitter<GroupMedium>();
  @Output() onSort = new EventEmitter<{ groupMedium: GroupMedium, type: string }>();

  update(media: Medium) {
    this.onUpdate.emit(media);
  }

  increaseLimit(groupMedium: GroupMedium) {
    this.onIncreaseLimit.emit(groupMedium);
  }

  sort(groupMedium: GroupMedium, type: string) {
    this.onSort.emit({ groupMedium, type });
  }
}
