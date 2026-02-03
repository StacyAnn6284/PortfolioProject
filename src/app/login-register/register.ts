import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { GoogleButton } from 'app/google-button/google-button';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, GoogleButton],
  templateUrl: './register.html',
  styleUrl: './login-register.scss',
})
export class RegisterComponent {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;

  onSubmit(): void {
    this.errorMessage = null;

    if (this.form.invalid) {
      this.errorMessage = 'Please enter a valid email and password';
      return;
    }
    const rawForm = this.form.getRawValue();
    this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err: FirebaseError) => {
        console.log('Login error: ', err);
        switch (err.code) {
          case 'auth/user-not-found':
            this.errorMessage = 'No user found with this email.';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Incorrect password.';
            break;
          case 'auth/invalid-email':
            this.errorMessage = 'Invalid email address format.';
            break;
          case 'auth/user-disabled':
            this.errorMessage = 'This account has been disabled.';
            break;
          case 'auth/invalid-credential':
            this.errorMessage = 'Invalid email or password. Please try again.';
            break;
          case 'auth/email-already-in-use':
            this.errorMessage = 'Email address already in use, please use login option.';
            break;
          default:
            this.errorMessage = err.message || 'An unexpected error occurred during login.';
            break;
        }
      },
    });
  }
  loginWithGoogle(): void {
    this.errorMessage = null;
    try {
      this.authService.loginWithGoogle();
      this.router.navigateByUrl('/');
    } catch (error: any) {
      this.errorMessage = error.message || 'An unknown error occurred during Google sign in.';
      console.error('Google Login Error:', error);
    }
  }

  redirectToLogin(): void {
    this._router.navigate(['/login'], { relativeTo: this._route });
  }
}
