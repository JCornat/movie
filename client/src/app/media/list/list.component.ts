import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaItemComponent } from '@app/media/item/item.component';
import { MediaMoreComponent } from '@app/media/more/more.component';
import { GroupMedium, Medium } from '@app/interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MediaItemComponent, MediaMoreComponent, CommonModule],
  templateUrl: './list.component.html',
})
export class ListComponent {
  @Input({ required: true }) groupMedia!: GroupMedium[];

  @Output() onUpdate = new EventEmitter<Medium>();
  @Output() onIncreaseLimit = new EventEmitter<GroupMedium>();

  update(media: Medium) {
    this.onUpdate.emit(media);
  }

  increaseLimit(groupMedium: GroupMedium) {
    this.onIncreaseLimit.emit(groupMedium);
  }

  sort(groupMedium: GroupMedium, random: string) {
    //
  }
}
