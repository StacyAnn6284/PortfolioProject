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
import { ToDo } from '../models/to-do.model';
import { authState, Auth, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
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

  async getAllTodos(): Promise<Observable<ToDo[]>> {
    const uid = await this.getUserUid();
    const todosRef = ref(this.db, `users/${uid}/todos`);

    return new Observable((observer) => {
      const unsubscribe = onValue(
        todosRef,
        (snapshot: DataSnapshot) => {
          const data = snapshot.val();
          const todos: ToDo[] = [];
          if (data) {
            Object.keys(data).forEach((key) => {
              todos.push({ ...data[key], id: key });
            });
          }
          observer.next(todos);
        },
        (error) => {
          observer.error(error);
        },
      );
      return () => unsubscribe();
    });
  }

  async addTodo(todo: ToDo) {
    const uid = await this.getUserUid();
    const todosRef = ref(this.db, `users/${uid}/todos`);

    return push(todosRef, { ...todo, completed: false });
  }

  async updateTodo(id: string, updates: Partial<ToDo>) {
    const uid = await this.getUserUid();
    const todoRef = ref(this.db, `users/${uid}/todos/${id}`);
    return update(todoRef, updates);
  }

  async deleteTodo(id: string) {
    const uid = await this.getUserUid();
    const todoRef = ref(this.db, `users/${uid}/todos/${id}`);
    return remove(todoRef);
  }

  async getTodoById(id: string): Promise<Observable<ToDo | null>> {
    const uid = await this.getUserUid();
    const todoRef = ref(this.db, `users/${uid}/todos/${id}`);
    return new Observable((observer) => {
      get(todoRef)
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
