import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../models/recipe-box.model';
import { RecipeService } from '../services/recipe-box.service';
import { AuthService } from 'app/auth.service';
import { ProjectArrowComponent } from 'app/projects/project-arrow/project-arrow';

@Component({
  selector: 'app-recipe-box-list',
  templateUrl: './recipe-box-list.html',
  styleUrl: './recipe-box-list.scss',
  imports: [CommonModule, ProjectArrowComponent],
})
export class RecipeListComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  public recipeList$: Observable<Recipe[]> | undefined;
  private recipeSubscription: Subscription | undefined;
  private authService = inject(AuthService);
  public loggedIn = computed(() => this.authService.currentUser() !== null);

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService
      .getAllRecipes()
      .then((recipesObservable: Observable<Recipe[]>) => {
        this.recipeList$ = recipesObservable;
      })
      .catch((error) => {
        console.error('Error loading recipes:', error);
        // Handle the error, e.g., display a message to the user
        // this.recipeList$ = new Observable<Recipe[]>(); // Optionally, set to an empty observable on error
      });
  }

  ngOnDestroy(): void {
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe();
    }
  }

  deleteTask(recipeTask: Recipe) {
    if (recipeTask && recipeTask.id) {
      this.recipeService.deleteRecipe(recipeTask.id).catch((error) => {
        console.error('Failed to delete task from UI after Firebase operation:', error);
      });
    } else {
      console.warn('Cannot delete task: The provided recipeTask or its ID is missing.');
    }
  }

  editTask(recipeTask: Recipe) {
    this._router.navigate(['/recipe-edit'], { state: { task: recipeTask } });
  }

  showForm() {
    this._router.navigate(['/recipe-create'], { relativeTo: this._route });
  }

  directToLogin() {
    this._router.navigate(['/login'], { relativeTo: this._route });
  }
}
