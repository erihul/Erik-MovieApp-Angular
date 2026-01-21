import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeStateService, MovieCategory } from '../../services/home-state.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, CardModule, ButtonModule, MovieListComponent ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  selectedCategory!: MovieCategory;

  constructor(private route: ActivatedRoute, private homeState: HomeStateService, private router: Router) {}

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
        const categoryParam = params.get('category') as MovieCategory;
        if (categoryParam) {
          this.selectedCategory = categoryParam;
          this.homeState.category = categoryParam;
        } else {
          this.router.navigate(['now_playing']);
        }
      });
  }
}