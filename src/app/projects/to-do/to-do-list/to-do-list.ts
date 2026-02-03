import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo } from '../models/to-do.model';
import { ToDoService } from '../services/to-do-service';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  imports: [CommonModule],
})
export class ToDoListComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  public todoList$: Observable<ToDo[]> | undefined;
  private todoSubscription: Subscription | undefined;
  private authService = inject(AuthService);
  public loggedIn = computed(() => this.authService.currentUser() !== null);

  constructor(private toDoService: ToDoService) {}

  ngOnInit(): void {
    this.toDoService
      .getAllTodos()
      .then((todosObservable: Observable<ToDo[]>) => {
        this.todoList$ = todosObservable;
      })
      .catch((error) => {
        console.error('Error loading todos:', error);
        // Handle the error, e.g., display a message to the user
        // this.todoList$ = new Observable<ToDo[]>(); // Optionally, set to an empty observable on error
      });
  }

  ngOnDestroy(): void {
    if (this.todoSubscription) {
      this.todoSubscription.unsubscribe();
    }
  }

  deleteTask(todoTask: ToDo) {
    if (todoTask && todoTask.id) {
      this.toDoService.deleteTodo(todoTask.id).catch((error) => {
        console.error('Failed to delete task from UI after Firebase operation:', error);
      });
    } else {
      console.warn('Cannot delete task: The provided todoTask or its ID is missing.');
    }
  }

  editTask(todoTask: ToDo) {
    this._router.navigate(['/to-do-edit'], { state: { task: todoTask } });
  }

  showForm() {
    this._router.navigate(['/to-do-create'], { relativeTo: this._route });
  }
}
