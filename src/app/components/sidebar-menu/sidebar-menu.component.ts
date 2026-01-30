import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { MovieCategory } from '../../services/home-state.service';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    ButtonModule,
    PanelMenuModule,
	RouterModule
  ],
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
}

/* 
  selectedCategory: MovieCategory | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(() => this.updateActiveFromUrl());

		this.updateActiveFromUrl(); // Initial highlight
	}

  	select(category: MovieCategory) {
		this.router.navigate(['/', category]);
	}

	private updateActiveFromUrl() {
		const tree = this.router.parseUrl(this.router.url);
		const primarySegments: UrlSegment[] = tree.root.children['primary']?.segments ?? [];
		const firstSegment = primarySegments.length > 0 ? primarySegments[0].path : '';
		const match = this.categories.find(c => c.value === firstSegment);
		this.selectedCategory = match ? match.value : null;
	} */