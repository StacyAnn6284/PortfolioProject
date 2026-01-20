import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blinking-cursor',
  imports: [],
  templateUrl: './blinking-cursor.html',
  styleUrl: './blinking-cursor.scss',
})
export class BlinkingCursor {
  @Input() content: string = 'Example Text';
}
