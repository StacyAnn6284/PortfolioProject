import { Component, ElementRef, HostListener, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  menuOpen = signal(false);

  constructor(private eRef: ElementRef) {}
  @HostListener('document:click', ['$event']) closeWhenOpen(event: Event) {
    if (!this.menuOpen()) return;
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.menuOpen.set(false);
    }
  }
}
