import { Component, Renderer2 } from '@angular/core';
import { BackEndService } from './back-end.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud';
  darkMode = false;

  constructor(private renderer: Renderer2, private backEndService: BackEndService) {
    // Start in light mode
    this.renderer.addClass(document.body, 'light-mode');
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