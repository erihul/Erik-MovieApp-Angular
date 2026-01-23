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
}


