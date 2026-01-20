import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class MovieResolver implements Resolve<any> {
    constructor(private http: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot): any {
        const id = route.paramMap.get("id");
        console.log("Movie Resolver(id): " + id);
        

        return {data: "String"};
    }
}

/* @Injectable({
  providedIn: 'root'
})
export class MovieListResolver implements Resolve<Movie> {
    constructor(private http: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot): Movie {
        const id = route.paramMap.get("id");
        console.log("Movie List Resolver(id): " + id);

        return this.http.get<Movie>(`/movie/${id}`);
    }
} */