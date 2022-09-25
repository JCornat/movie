import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from '@app/game/game.component';
import { GameAddComponent } from '@app/game/add/add.component';
import { GameImportComponent } from '@app/game/import/import.component';
import { GameItemComponent } from '@app/game/item/item.component';
import { GameRoutingModule } from '@app/game/game-routing.module';
import { GameSearchComponent } from '@app/game/search/search.component';
import { GameUpdateComponent } from '@app/game/update/update.component';

@NgModule({
  declarations: [
    GameComponent,
    GameAddComponent,
    GameImportComponent,
    GameItemComponent,
    GameSearchComponent,
    GameUpdateComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
  ]
})
export class GameModule {
  //
}
