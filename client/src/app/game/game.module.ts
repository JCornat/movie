import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GameComponent } from '@app/game/game.component';
import { GameAddComponent } from '@app/game/add/add.component';
import { GameImportComponent } from '@app/game/import/import.component';
import { GameItemComponent } from '@app/game/item/item.component';
import { GameRoutingModule } from '@app/game/game-routing.module';
import { GameUpdateComponent } from '@app/game/update/update.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GameComponent,
    GameAddComponent,
    GameImportComponent,
    GameItemComponent,
    GameUpdateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GameRoutingModule,
    NgOptimizedImage,
  ]
})
export class GameModule {
  //
}
