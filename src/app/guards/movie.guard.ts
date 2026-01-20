import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Movie } from '../model/movie.type';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MovieGuard implements CanActivate {
  canActivate() {
    console.log("MovieGuard, ok")
    return true;
  }
    /* constructor(private router: Router) {}
      canActivate(route: ActivatedRouteSnapshot): boolean {
        const id = Number(route.paramMap.get('id'));
        if (isNaN(id) || id <= 0) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
    } */
}


