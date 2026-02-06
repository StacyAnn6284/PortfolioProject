import { Component } from '@angular/core';

@Component({
  selector: 'app-chevron-right',
  standalone: true,
  imports: [],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#809bce"
      class="icons"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  `,
})
export class ChevronRightComponent {}
