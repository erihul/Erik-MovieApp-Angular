import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie.type';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { MovieApiItem, MovieApiResponse } from '../model/movie-api.model';
import { MovieDetail } from '../model/movie-detail.type';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  
  getMoviesFromApi(category: string, page: number = 1 ): Observable<Movie[]> {
      const env = environment as { apiUrl: string; apiKey: string };

      return this.http
        .get<MovieApiResponse>(
          `${env.apiUrl}/movie/${category}`,{ params: { api_key: env.apiKey, page } })
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

  getMovieCardDetail(movieId: number): Observable<{ runtime: number }> {
    const env = environment as { apiUrl: string; apiKey: string };

    return this.http.get<{ runtime: number }>(
      `${env.apiUrl}/movie/${movieId}?api_key=${env.apiKey}`
    );
  }

  getMovieDetails(id: number): Observable<MovieDetail> {
    const env = environment as { apiUrl: string; apiKey: string };

    return this.http
      .get<any>(`${env.apiUrl}/movie/${id}`, {
        params: { api_key: env.apiKey }
      })
      .pipe(
        map(movie => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          backdrop: movie.backdrop_path,
          description: movie.overview,
          rating: movie.vote_average,
          runtime: movie.runtime,
          year: movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : undefined,
          genres: movie.genres,
          budget: movie.budget,
          homepage: movie.homepage,
          releaseDate: movie.release_date,
        }))
      );
  }

  getMovieTrailer(id: number): Observable<string | null> {
  const env = environment as { apiUrl: string; apiKey: string };

  return this.http
    .get<any>(`${env.apiUrl}/movie/${id}/videos`, {
      params: { api_key: env.apiKey }
    })
    .pipe(
      map(res => {
        const trailer = res.results?.find(
          (v: any) => v.site === 'YouTube' && v.type === 'Trailer'
        );
        return trailer ? trailer.key : null;
      })
    );
  }
}