import { Component, Renderer2 } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  darkMode = false;

  constructor(private renderer: Renderer2, private backEndService: BackEndService, private afAuth: AngularFireAuth, private router: Router) {
    // Start in light mode
    this.renderer.addClass(document.body, 'light-mode');
  }

  ngOnInit(): void {
    this.backEndService.fetchDarkMode().subscribe((data) => {
      this.darkMode = data.darkMode;
    });
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.backEndService.saveDarkMode(this.darkMode);
    if (this.darkMode) {
      this.renderer.removeClass(document.body, 'light-mode');
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
      this.renderer.addClass(document.body, 'light-mode');
    }
  }

  logout() {
    this.afAuth.signOut().then(() => {
      console.log('User signed out');
      this.router.navigate(['/login']);  // Redirect to the login page
    });
  }
}