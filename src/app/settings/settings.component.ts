import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  darkMode = false;

  constructor(private renderer: Renderer2) {
    // Start in light mode
    this.renderer.addClass(document.body, 'light-mode');
  }

  toggleDarkMode() {
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