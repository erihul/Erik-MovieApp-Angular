import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLoggedIn = true;
  isScrolled = false;

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  showLoginForm() {
    console.log('Showing login form...');
    // TODO: open login modal / redirect to login page
    this.isLoggedIn = true; // just for demo
  }
  logOut() {
    console.log('Logging out...');
    // TODO: clear tokens / call backend logout / redirect
    this.isLoggedIn = false;
  }
}
