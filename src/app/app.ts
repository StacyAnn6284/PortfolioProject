import { Component, inject, signal } from '@angular/core';
import { SiteHeaderComponent } from './site-header/site-header';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [SiteHeaderComponent, RouterModule],
})
export class App {
  protected readonly title = signal('stacy-portfolio');
}
