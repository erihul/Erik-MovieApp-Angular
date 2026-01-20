import { AfterViewInit, Component, HostListener } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { CommonModule } from '@angular/common';
import { HomeStateService } from '../../services/home-state.service';

@Component({
  selector: 'app-home',
  imports: [ MovieListComponent, CommonModule ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements AfterViewInit{
  constructor(private homeState: HomeStateService) {}
  
  categories: { label: string; value: 'now_playing' | 'popular' | 'top_rated' | 'upcoming' }[] = [
    { label: 'Now Playing', value: 'now_playing' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

    get selectedCategory() {
      return this.homeState.category;
    }

    set selectedCategory(value) {
      this.homeState.category = value;
    }

    ngAfterViewInit() {
      setTimeout(() => {
        window.scrollTo(0, this.homeState.scrollY);
      });
    }

    @HostListener('window:scroll')
      onScroll() {
        this.homeState.scrollY = window.scrollY;
      }

    /* selectedCategory: 'now_playing' | 'popular' | 'top_rated' | 'upcoming' = 'now_playing'; */
}
