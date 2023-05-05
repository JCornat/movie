import { Routes } from '@angular/router';

import { GameUpdateComponent } from '@app/game/update/update.component';
import { GameAddComponent } from '@app/game/add/add.component';
import { GameComponent } from '@app/game/game.component';
import { GameImportComponent } from '@app/game/import/import.component';
import { GameSearchComponent } from '@app/game/search/search.component';

export const GAME_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GameComponent,
  },
  {
    path: 'add',
    component: GameAddComponent,
  },
  {
    path: 'search',
    component: GameSearchComponent,
  },
  {
    path: ':id/update',
    component: GameUpdateComponent,
  },
  {
    path: ':importId/import',
    component: GameImportComponent,
  },
];
