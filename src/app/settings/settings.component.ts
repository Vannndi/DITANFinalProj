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
  profilePictureUrl: string | ArrayBuffer | null = null;
  username: string = '';
  darkMode = false;

  constructor(private renderer: Renderer2, private backEndService: BackEndService, private afAuth: AngularFireAuth, private router: Router) {
    this.username = localStorage.getItem('username') || '';
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
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    if (file && file.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePictureUrl = reader.result;
      };
      reader.readAsDataURL(file[0]);
    }
  }


onSubmit() {
  console.log('Form submitted');
  // Add your form submission logic here
}
}