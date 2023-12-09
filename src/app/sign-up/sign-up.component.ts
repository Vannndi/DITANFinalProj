import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit() {
    console.log('onSubmit called');  // New log statement
  
    if (this.signUpForm.valid) {
      if (this.signUpForm.controls['password'].value !== this.signUpForm.controls['confirmPassword'].value) {
        window.alert('Password and Confirm Password must be the same.');
        return;
      }
  
      console.log('Form is valid');  // New log statement
  
      const email = this.signUpForm.value.email;
      const password = this.signUpForm.value.password;
  
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log('User registered successfully!', res);
          // Show a success message
          window.alert('You have successfully signed up!');
          // Clear the form inputs
          this.signUpForm.reset();
        })
        .catch(error => {
          console.error('There was an error while registering the user', error);
          // Show an error message
          if (error.code === 'auth/email-already-in-use') {
            console.log('The email address is already in use by another account.');
            window.alert('The email address is already in use by another account.');
          }
        });
    } else {
      console.log('Form is invalid');  // New log statement
    }
  }
}
