import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate([
        'now_playing',
        {
          outlets: {
            header: ['header'],
            sidebar: ['sidebar'],
          },
        },
      ]);
    }
  }
}


/* export class App {
    constructor(private router: Router) {}

    ngOnInit() {
        this.router.navigate([{ outlets: { header: ['header'], sidebar: ['sidebar'] } }], { replaceUrl: true });

        if (this.router.url === '/' || this.router.url === '') {
          this.router.navigate(['/now_playing']);
        }
    }
} */