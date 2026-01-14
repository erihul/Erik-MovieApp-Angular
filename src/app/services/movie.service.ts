import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie.type';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { MovieApiItem, MovieApiResponse } from '../model/movie-api.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  
  getMoviesFromApi(): Observable<Movie[]> {
      const env = environment as { apiUrl: string; apiKey: string };

      return this.http
        .get<MovieApiResponse>(
          `${env.apiUrl}/movie/top_rated?api_key=${env.apiKey}`
        )
        .pipe(
          map(response =>
            response.results.map(this.mapApiToMovie)
          )
      );
  };

  private mapApiToMovie(apiItem: MovieApiItem): Movie {
      return {
        id: apiItem.id,
        poster: apiItem.poster_path,
        title: apiItem.title,
        rating: apiItem.vote_average,
        year: new Date(apiItem.release_date).getFullYear(),
        description: apiItem.overview,
      };
  }

  getMovieDetails(movieId: number): Observable<{ runtime: number }> {
  const env = environment as { apiUrl: string; apiKey: string };

  return this.http.get<{ runtime: number }>(
    `${env.apiUrl}/movie/${movieId}?api_key=${env.apiKey}`
  );
}

}