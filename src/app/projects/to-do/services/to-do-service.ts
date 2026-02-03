import { Injectable } from '@angular/core';
import { Database, get, onValue, push, ref, remove, update } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ToDo } from '../models/to-do.model';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  constructor(private db: Database) {}

  getAllTodos(): Observable<ToDo[]> {
    const todosRef = ref(this.db, 'todos');
    return new Observable((observer) => {
      const unsubscribe = onValue(
        todosRef,
        (snapshot) => {
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

  addTodo(todo: ToDo) {
    const todosRef = ref(this.db, 'todos');
    return push(todosRef, { ...todo, completed: false });
  }

  updateTodo(id: string, updates: Partial<ToDo>) {
    const todoRef = ref(this.db, `todos/${id}`);
    return update(todoRef, updates);
  }

  deleteTodo(id: string) {
    const todoRef = ref(this.db, `todos/${id}`);
    return remove(todoRef);
  }

  getTodoById(id: string): Observable<ToDo | null> {
    const todoRef = ref(this.db, `todos/${id}`);
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
