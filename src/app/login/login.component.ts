import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, Validators.required)
  });

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Login button clicked');
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    if (email && password) {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('User logged in successfully!', res);
          this.router.navigate(['/post-list']);  // Redirect to the landing page
        })
        .catch(error => {
          console.error('There was an error while logging in the user', error);
        });
    } else {
      console.error('Email and password must not be null or undefined');
    }
  }
}