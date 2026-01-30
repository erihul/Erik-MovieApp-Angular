import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie.model';

@Component({
  selector: 'app-upcoming-movie-page',
  imports: [ CommonModule, MovieListComponent ],
  templateUrl: './upcoming-movie-page.component.html',
  styleUrl: './upcoming-movie-page.component.scss',
})
export class UpcomingMoviePageComponent implements OnInit {
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

		this.movieService.getMovies('upcoming', this.currentPage).subscribe(movies => {
			this.movies = [...this.movies, ...movies];
			this.currentPage++;
			this.isLoading = false;
		});
	}
}
