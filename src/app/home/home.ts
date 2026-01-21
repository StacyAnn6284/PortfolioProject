import { Component } from '@angular/core';
import { BlinkingCursor } from '../blinking-cursor/blinking-cursor';

@Component({
  selector: 'app-home',
  imports: [BlinkingCursor],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {}
