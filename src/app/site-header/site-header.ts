import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HamburgerComponent } from 'core/UI/icons/hamburger/hamburger.component';
import { XMarkComponent } from 'core/UI/icons/x-mark.component';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.html',
  styleUrls: ['./site-header.scss'],
  standalone: true,
  imports: [RouterModule, HamburgerComponent, XMarkComponent],
})
export class SiteHeaderComponent {
  menuOpen = signal(false);
}
