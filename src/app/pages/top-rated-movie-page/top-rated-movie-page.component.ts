import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie.model';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-top-rated-movie-page',
  imports: [ CommonModule, MovieListComponent ],
  templateUrl: './top-rated-movie-page.component.html',
  styleUrl: './top-rated-movie-page.component.scss',
})
export class TopRatedMoviePageComponent implements OnInit {
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

		this.movieService.getMovies('top_rated', this.currentPage).subscribe(movies => {
			this.movies = [...this.movies, ...movies];
			this.currentPage++;
			this.isLoading = false;
		});
	}
}
