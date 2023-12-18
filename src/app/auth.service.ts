import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _userIsAuthenticated = false;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(private afAuth: AngularFireAuth) {}

  signUp(email: string, password: string, username: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        // User registered successfully
        this._userIsAuthenticated = true;
        localStorage.setItem('username', username); // Store the username
        return res;
      });
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }
}