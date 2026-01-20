import { Component, signal } from '@angular/core';
import { BlinkingCursor } from './blinking-cursor/blinking-cursor';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [BlinkingCursor],
})
export class App {
  protected readonly title = signal('stacy-portfolio');
}
