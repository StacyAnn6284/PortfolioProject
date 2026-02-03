import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-view',
  imports: [RouterModule],
  templateUrl: './project-view.html',
  styleUrl: './project-view.scss',
})
export class ProjectViewPage {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  showToDo() {
    this._router.navigate(['/to-do-list'], { relativeTo: this._route });
  }

  showWeather() {
    this._router.navigate(['/weather'], { relativeTo: this._route });
  }
}
