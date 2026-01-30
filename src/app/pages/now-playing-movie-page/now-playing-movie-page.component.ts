import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie.model';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-now-playing-movie-page',
  standalone: true,
  imports: [ CommonModule, MovieListComponent, CardModule, ButtonModule ],
  templateUrl: './now-playing-movie-page.component.html',
  styleUrl: './now-playing-movie-page.component.scss',
})
export class NowPlayingMoviePageComponent implements OnInit {
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

		this.movieService.getMovies('now_playing', this.currentPage).subscribe(movies => {
			this.movies = [...this.movies, ...movies];
			this.currentPage++;
			this.isLoading = false;
		});
	}
}
