import { Route } from '@angular/router';
import * as Config from '@shared/config/config';
import { HomeComponent } from '@app/home/home.component';
import { LoginComponent } from '@app/login/login.component';
import { LogoutComponent } from '@app/logout/logout.component';
import { GameComponent } from '@app/game/game.component';
import { MovieComponent } from '@app/movie/movie.component';
import { SerieComponent } from '@app/serie/serie.component';

export default [
  {
    path: '',
    component: HomeComponent,
    title: `${Config.TITLE}`,
  },
  {
    path: 'login',
    component: LoginComponent,
    title: `${Config.TITLE}`,
  },
  {
    path: 'logout',
    component: LogoutComponent,
    title: `${Config.TITLE}`,
  },
  {
    path: 'game',
    component: GameComponent,
    title: `${Config.TITLE} - Games`,
  },
  {
    path: 'movie',
    component: MovieComponent,
    title: `${Config.TITLE} - Movies`,
  },
  {
    path: 'serie',
    component: SerieComponent,
    title: `${Config.TITLE} - Series`,
  },
  {
    path: 'administration',
    loadChildren: () => import('./administration/routes'),
  },
] as Route[];
