import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GameComponent } from '@app/game/game.component';
import { GameAddComponent } from '@app/game/add/add.component';
import { GameImportComponent } from '@app/game/import/import.component';
import { GameRoutingModule } from '@app/game/game-routing.module';
import { GameUpdateComponent } from '@app/game/update/update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaModule } from "@app/media/media.module";

@NgModule({
  declarations: [
    GameComponent,
    GameAddComponent,
    GameImportComponent,
    GameUpdateComponent,
  ],
  imports: [
    MediaModule,
    CommonModule,
    ReactiveFormsModule,
    GameRoutingModule,
    NgOptimizedImage,
  ]
})
export class GameModule {
  //
}
