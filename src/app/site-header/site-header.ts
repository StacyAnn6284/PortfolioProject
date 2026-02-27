import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { HamburgerComponent } from 'core/UI/icons/hamburger/hamburger.component';
import { XMarkComponent } from 'core/UI/icons/x-mark/x-mark.component';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.html',
  styleUrls: ['./site-header.scss'],
  standalone: true,
  imports: [RouterModule, HamburgerComponent, XMarkComponent],
})
export class SiteHeaderComponent {
  public menuOpen = signal(false);
  public authService = inject(AuthService);
  private router = inject(Router);
  public projectsOpen = signal(false);

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUser.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUser.set(null);
      }
      console.log(this.authService.currentUser());
    });
  }

  logout(): void {
    this.authService.logout();
  }

  handleMenuClick() {
    this.menuOpen.set(false);
    this.projectsOpen.set(false);
  }

  handleProjectsClick() {
    if (!this.projectsOpen()) {
      this.projectsOpen.set(true);
    } else {
      this.router.navigate(['/projects']);
      this.handleMenuClick();
    }
  }

  constructor(private eRef: ElementRef) {}
  @HostListener('document:click', ['$event']) closeWhenOpen(event: Event) {
    if (!this.menuOpen()) return;
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.menuOpen.set(false);
    }
  }
}
