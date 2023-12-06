import { Component, Renderer2 } from '@angular/core'; // Add Renderer2

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud';
  darkMode = false; // Add this line

  constructor(private renderer: Renderer2) { // Modify this line
    // Start in light mode
    this.renderer.addClass(document.body, 'light-mode');
  }

  toggleDarkMode() { // Add this function
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.renderer.removeClass(document.body, 'light-mode');
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
      this.renderer.addClass(document.body, 'light-mode');
    }
  }
}