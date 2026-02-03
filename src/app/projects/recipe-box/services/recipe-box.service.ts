import { inject, Injectable } from '@angular/core';
import {
  Database,
  DataSnapshot,
  get,
  onValue,
  push,
  ref,
  remove,
  update,
} from '@angular/fire/database';
import { firstValueFrom, Observable, filter, map } from 'rxjs';
import { Recipe } from '../models/recipe-box.model';
import { authState, Auth, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(
    private db: Database,
    private auth: Auth,
  ) {} // Inject Auth service

  // Helper to get the current user's UID
  private async getUserUid(): Promise<string> {
    const user = await firstValueFrom(
      authState(this.auth).pipe(
        filter((u): u is User => u !== null), // Filter out null (unauthenticated) states
        map((u) => u.uid), // Map to get only the UID
      ),
    );
    return user;
  }

  async getAllRecipes(): Promise<Observable<Recipe[]>> {
    const uid = await this.getUserUid();
    const recipesRef = ref(this.db, `users/${uid}/recipes`);

    return new Observable((observer) => {
      const unsubscribe = onValue(
        recipesRef,
        (snapshot: DataSnapshot) => {
          const data = snapshot.val();
          const recipes: Recipe[] = [];
          if (data) {
            Object.keys(data).forEach((key) => {
              recipes.push({ ...data[key], id: key });
            });
          }
          observer.next(recipes);
        },
        (error) => {
          observer.error(error);
        },
      );
      return () => unsubscribe();
    });
  }

  async addRecipe(recipe: Recipe) {
    const uid = await this.getUserUid();
    const recipesRef = ref(this.db, `users/${uid}/recipes`);

    return push(recipesRef, { ...recipe, completed: false });
  }

  async updateRecipe(id: string, updates: Partial<Recipe>) {
    const uid = await this.getUserUid();
    const recipeRef = ref(this.db, `users/${uid}/recipes/${id}`);
    return update(recipeRef, updates);
  }

  async deleteRecipe(id: string) {
    const uid = await this.getUserUid();
    const recipeRef = ref(this.db, `users/${uid}/recipes/${id}`);
    return remove(recipeRef);
  }

  async getRecipeById(id: string): Promise<Observable<Recipe | null>> {
    const uid = await this.getUserUid();
    const recipeRef = ref(this.db, `users/${uid}/recipes/${id}`);
    return new Observable((observer) => {
      get(recipeRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            observer.next({ ...snapshot.val(), id: snapshot.key });
          } else {
            observer.next(null);
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
