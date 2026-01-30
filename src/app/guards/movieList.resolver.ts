import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { MovieService } from "../services/movie.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Movie } from "../model/movie.model";
import { MovieCategory } from "../services/home-state.service";

@Injectable({
  providedIn: 'root'
})
export class MovieListResolver implements Resolve<Movie[]> {
  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Movie[]> {
	const category = route.routeConfig?.path as MovieCategory;
	return this.movieService.getMovies(category, 1);
	}

}
/* export class MovieListResolver implements Resolve<any> {
    constructor(private http: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot): any {
        const id = route.paramMap.get("id");
        console.log("Movie List Resolver(id): " + id);

        return {data: "String"};
    }
} */
