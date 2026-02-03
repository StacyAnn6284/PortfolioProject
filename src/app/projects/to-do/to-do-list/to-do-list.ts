import { Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo } from '../models/to-do.model';
import { ToDoService } from '../services/to-do-service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  imports: [CommonModule],
})
export class ToDoListComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  todoList$: Observable<ToDo[]> | undefined;
  constructor(private toDoService: ToDoService) {}

  ngOnInit(): void {
    this.todoList$ = this.toDoService.getAllTodos();
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
