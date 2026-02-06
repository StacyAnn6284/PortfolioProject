import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../models/recipe-box.model';
import { RecipeService } from '../services/recipe-box.service';

@Component({
  selector: 'app-recipe-box-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-box-form.html',
  styleUrl: './recipe-box-form.scss',
})
export class RecipeListForm implements OnInit {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  public task: Recipe | null = null;
  Recipes: Recipe[] = [];
  recipeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private RecipeService: RecipeService,
  ) {}

  ngOnInit() {
    this.task = history.state.task ?? null;

    this.recipeForm = this.fb.group({
      name: new FormControl(this.task?.name ?? '', [Validators.required]),
      url: new FormControl(this.task?.url ?? '', [Validators.required]),
      text: new FormControl(this.task?.text ?? '', [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.recipeForm.valid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    const formValue = this.recipeForm.value as Recipe;

    if (this.task?.id) {
      const updated: Recipe = { ...this.task, ...formValue };
      this.RecipeService.updateRecipe(this.task.id, updated);
    } else {
      this.RecipeService.addRecipe(this.recipeForm.value as Recipe);
    }
    this._router.navigate(['/recipe-box-list'], { relativeTo: this._route });
  }

  handleCancel() {
    this._router.navigate(['/recipe-box-list'], { relativeTo: this._route });
  }
}
