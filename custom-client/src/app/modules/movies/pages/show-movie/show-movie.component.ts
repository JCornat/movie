import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';

import { MovieInterface } from '../../models/movie/movie.interface';
import { MovieStore } from '../../stores/movie/movie.store';

@Component({
  selector: 'app-show-movie',
  standalone: true,
  imports: [],
  templateUrl: './show-movie.component.html',
  styleUrl: './show-movie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowMovieComponent {
  // #region Injection
  private readonly movieStore = inject(MovieStore);
  // #endregion

  public movies: Signal<MovieInterface[]> = this.movieStore.entities;
}
