import { Routes } from '@angular/router';
import { MovieGuard } from './guards/movie.guard';
import { MovieListResolver } from './guards/movieList.resolver';
import { MovieResolver } from './guards/movie.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(m => m.HomePageComponent), canActivate: [MovieGuard], resolve: {data: MovieListResolver}
  },
  {
    path: 'favourites',
    loadComponent: () =>
      import('./pages/favourites-page/favourites-page.component').then(m => m.FavouritesPageComponent),
  },
  {
    path: 'watchlist',
    loadComponent: () =>
      import('./pages/watchlist-page/watchlist-page.component').then(m => m.WatchlistPageComponent),
  },
  /* { path: 'movie/:id', canActivate: [MovieGuard], component: MovieDetailPageComponent}, */
  {
    path: 'movie/:id',
    loadComponent: () =>
        import('./pages/movie-detail-page/movie-detail-page.component').then(m => m.MovieDetailPageComponent), canActivate: [MovieGuard],resolve: {data: MovieResolver}
  },
];

