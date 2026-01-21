import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieCategory } from '../../services/home-state.service';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [ CommonModule, ButtonModule, PanelMenuModule ],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
})
export class SidebarMenuComponent {
    categories: { label: string; value: MovieCategory }[] = [
        { label: 'Now Playing', value: 'now_playing' },
        { label: 'Popular', value: 'popular' },
        { label: 'Top Rated', value: 'top_rated' },
        { label: 'Upcoming', value: 'upcoming' },
    ];

    constructor(private router: Router) {}

    selectedCategory: MovieCategory = 'now_playing';

    select(category: MovieCategory) {
      if (category !== this.selectedCategory) {
        this.selectedCategory = category;
        this.router.navigate([category]);
      }
    }
}
