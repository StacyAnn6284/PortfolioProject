import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChevronLeftComponent } from 'core/UI/icons/chevron-left/chevron-left.component';

@Component({
  selector: 'app-project-arrow',
  templateUrl: 'project-arrow.html',
  styleUrl: 'project-arrow.scss',
  imports: [ChevronLeftComponent],
})
export class ProjectArrowComponent {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  public backToProjects() {
    this._router.navigate(['../'], { relativeTo: this._route });
  }
}
