import { Component, inject, signal } from '@angular/core';
import { SiteHeaderComponent } from './site-header/site-header';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { SiteFooterComponent } from './site-footer/site-footer';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [SiteHeaderComponent, RouterModule, SiteFooterComponent],
})
export class App {
  protected readonly title = signal('stacy-portfolio');
}
