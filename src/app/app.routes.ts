import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./components/movie-list/movie-list.component').then(
                m => m.MovieListComponent
            )
        },
    }
];
