import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie.type';
import { environment } from '../../environments/environment';
import { map, Observable, tap } from 'rxjs';
import { MovieApiItem, MovieApiResponse } from '../model/movie-api.model';
import { MovieDetail } from '../model/movie-detail.type';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
	private readonly apiUrl = environment.apiUrl;
 	private readonly apiKey = environment.apiKey;
  	private readonly imageUrl = environment.imageUrl;
	
    constructor(private http: HttpClient) {}
    
    getMoviesFromApi(category: string, page: number = 1 ): Observable<Movie[]> {
        return this.http
          .get<MovieApiResponse>(
            `${this.apiUrl}/movie/${category}`,{ params: { api_key: this.apiKey, page } })
          .pipe(
            map(response =>
				response.results.map(item => this.mapApiToMovie(item))
			),
			tap(console.log),
          );
    };

    private mapApiToMovie(apiItem: MovieApiItem): Movie {
        return {
			id: apiItem.id,
			poster: apiItem.poster_path
			? `${this.imageUrl}/w500${apiItem.poster_path}`
			: '',
			title: apiItem.title,
			rating: apiItem.vote_average,
			year: apiItem.release_date
			? new Date(apiItem.release_date).getFullYear()
			: 0,
          	description: apiItem.overview,
        };
    }

    getMovieCardDetail(movieId: number): Observable<{ runtime: number }> {
      return this.http.get<{ runtime: number }>(
        `${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}`
      );
    }

    getMovieDetails(id: number): Observable<MovieDetail> {
      return this.http
        .get<any>(`${this.apiUrl}/movie/${id}`, {
          params: { api_key: this.apiKey }
        })
        .pipe(
          tap(console.log),
          map(api => this.mapApiToMovieDetail(api))
        );
    }

	private mapApiToMovieDetail(api: any): MovieDetail {
		return {
			id: api.id,
			title: api.title,
			poster: api.poster_path
				? `${this.imageUrl}/w500${api.poster_path}`
				: '',
			backdrop: api.backdrop_path
				? `${this.imageUrl}/original${api.backdrop_path}`
				: '',
			description: api.overview,
			rating: api.vote_average,
			runtime: api.runtime,
			year: api.release_date
				? new Date(api.release_date).getFullYear()
				: undefined,
			genres: api.genres,
			budget: api.budget,
			homepage: api.homepage,
			releaseDate: api.release_date,
		};
	}

    getMovieTrailer(id: number): Observable<string | null> {0
    return this.http
      .get<any>(`${this.apiUrl}/movie/${id}/videos`, {
        params: { api_key: this.apiKey }
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