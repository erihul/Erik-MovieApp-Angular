import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MovieApiResponse } from '../model/movie.type';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);
  
  getMoviesFromApi() {
      return this.http.get<MovieApiResponse>(
      `${environment.apiUrl}/movie/popular?api_key=${environment.apiKey}`
    )
  };
}
