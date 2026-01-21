import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.html',
  styleUrls: ['./site-header.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class SiteHeaderComponent {}
