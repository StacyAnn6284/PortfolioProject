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
import { ToDo } from '../models/to-do.model';
import { ToDoService } from '../services/to-do-service';

@Component({
  selector: 'app-to-do-list-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './to-do-list-form.html',
  styleUrl: './to-do-list-form.scss',
})
export class ToDoListForm {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  public task: ToDo | null = null;
  toDos: ToDo[] = [];
  todoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toDoService: ToDoService,
  ) {}

  ngOnInit() {
    this.task = history.state.task ?? null;

    this.todoForm = this.fb.group({
      title: new FormControl(this.task?.title ?? '', [Validators.required]),
      name: new FormControl(this.task?.title ?? '', [Validators.required]),
      task: new FormControl(this.task?.title ?? '', [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.todoForm.valid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    const formValue = this.todoForm.value as ToDo;

    if (this.task?.id) {
      const updated: ToDo = { ...this.task, ...formValue };
      this.toDoService.updateTodo(this.task.id, updated);
    } else {
      this.toDoService.addTodo(this.todoForm.value as ToDo);
    }
    this._router.navigate(['/to-do-list'], { relativeTo: this._route });
  }

  handleCancel() {
    this._router.navigate(['/to-do-list'], { relativeTo: this._route });
  }
}
