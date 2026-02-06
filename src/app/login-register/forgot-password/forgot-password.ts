import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss'],
  imports: [ReactiveFormsModule],
})
export class ForgotPasswordModel implements OnInit {
  @Output() public closePasswordEvent = new EventEmitter<void>();

  private readonly _router = inject(Router);
  forgotPasswordForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  protected readonly closePassword = () => {
    this.closePasswordEvent.emit();
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.forgotPasswordForm.invalid) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    const email = this.forgotPasswordForm.value.email;

    this.authService.sendPasswordResetEmail(email).subscribe({
      next: () => {
        this.successMessage =
          'If an account exists for that email address, a password reset link has been sent to it.';
        this.forgotPasswordForm.reset();
      },
      error: (err: FirebaseError) => {
        console.error('Forgot Password Error:', err);

        switch (err.code) {
          case 'auth/user-not-found':
            this.errorMessage = 'No user found with this email address.';
            break;
          case 'auth/invalid-email':
            this.errorMessage = 'The email address is not valid.';
            break;
          case 'auth/network-request-failed':
            this.errorMessage = 'Network error. Please check your internet connection.';
            break;
          default:
            this.errorMessage = err.message || 'An unexpected error occurred. Please try again.';
            break;
        }
      },
    });
  }
}
