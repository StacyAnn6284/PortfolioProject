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
import { Meetings } from '../meetings/meetings.interface';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calendar-form.html',
  styleUrl: './calendar-form.scss',
})
export class CalendarMeetingForm implements OnInit {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  public event: Meetings | null = null;
  Meetings: Meetings[] = [];
  eventForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private CalendarService: CalendarService,
  ) {}

  ngOnInit() {
    this.event = history.state.event ?? null;

    this.eventForm = this.fb.group({
      date: new FormControl(this.event?.date ?? '', [Validators.required]),
      title: new FormControl(this.event?.title ?? '', [Validators.required]),
      description: new FormControl(this.event?.description ?? ''),
    });
  }

  onSubmit() {
    if (!this.eventForm.valid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    const formValue = this.eventForm.value as Meetings;

    if (this.event?.id) {
      const updated: Meetings = { ...this.event, ...formValue };
      this.CalendarService.updateEvent(this.event.id, updated);
    } else {
      this.CalendarService.addEvent(this.eventForm.value as Meetings);
    }
    this._router.navigate(['../calendar'], { relativeTo: this._route });
  }

  handleCancel() {
    this._router.navigate(['../calendar'], { relativeTo: this._route });
  }
}
