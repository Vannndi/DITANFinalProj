import { Component, Renderer2 } from '@angular/core';
import { BackEndService } from './back-end.service';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud';
  darkMode = false;
  showHeader = true;

  constructor(private renderer: Renderer2, private backEndService: BackEndService, private router: Router) {
    // Start in light mode
    this.renderer.addClass(document.body, 'light-mode');

    // Subscribe to router events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = !(event.urlAfterRedirects.includes('login') || event.urlAfterRedirects.includes('signup'));
      }
    });
  }

  ngOnInit(): void {
    this.backEndService.fetchDarkMode().subscribe((data) => {
      this.darkMode = data.darkMode;
      this.updateDarkMode();
    });
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.updateDarkMode();
    this.backEndService.saveDarkMode(this.darkMode);
  }

  updateDarkMode() {
    if (this.darkMode) {
      this.renderer.removeClass(document.body, 'light-mode');
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
      this.renderer.addClass(document.body, 'light-mode');
    }
  }
}