import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/movie.model';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-popular-movie-page',
  imports: [ CommonModule, MovieListComponent ],
  templateUrl: './popular-movie-page.component.html',
  styleUrl: './popular-movie-page.component.scss',
})
export class PopularMoviePageComponent implements OnInit {
  	movies: Movie[] = [];
	currentPage = 1;
	isLoading = false;

	constructor(private movieService: MovieService) {}

	ngOnInit() {
		this.loadMovies();
	}

	loadMovies() {
		if (this.isLoading) return;
		this.isLoading = true;

		this.movieService.getMovies('popular', this.currentPage).subscribe(movies => {
			this.movies = [...this.movies, ...movies];
			this.currentPage++;
			this.isLoading = false;
		});
	}
}
