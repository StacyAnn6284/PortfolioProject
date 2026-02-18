import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { Meetings } from './meetings/meetings.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PenEditComponent } from 'core/UI/icons/pen-edit/pen-edit.component';
import { TrashCanComponent } from 'core/UI/icons/trashcan/trashcan.component';
import { AuthService } from 'app/auth.service';
import { Observable, Subscription } from 'rxjs';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-calendar',
  imports: [NgClass, PenEditComponent, TrashCanComponent],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar implements OnInit {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  public meetingList$: Observable<Meetings[]> | undefined;
  public meetings = signal<Meetings[]>([]);
  public calendarSubscription: Subscription | undefined;
  private authService = inject(AuthService);
  public loggedIn = computed(() => this.authService.currentUser() !== null);

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService
      .getAllEvents()
      .then((eventsObservable: Observable<Meetings[]>) => {
        this.meetingList$ = eventsObservable;
        eventsObservable.subscribe((list) => {
          this.meetings.set(list);
        });
      })
      .catch((error) => {
        console.error('Error loading events:', error);
      });
  }

  ngOnDestroy(): void {
    if (this.calendarSubscription) {
      this.calendarSubscription.unsubscribe();
    }
  }

  private today: Signal<DateTime> = signal(DateTime.local());
  public firstDayOfActiveMonth: WritableSignal<DateTime> = signal(this.today().startOf('month'));
  public activeDay: WritableSignal<DateTime | null> = signal(null);
  public weekDays: Signal<string[]> = signal(Info.weekdays('short'));
  public daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week'),
    )
      .splitBy({ day: 1 })
      .map((d) => {
        if (d.start === null) {
          throw new Error('Wrong dates');
        }
        return d.start;
      });
  });

  DATE_MED = DateTime.DATE_MED;
  activeDayMeetings = computed(() => {
    const activeDay = this.activeDay();
    if (!activeDay) return [];

    const iso = activeDay.toISODate();
    if (!iso) return [];

    return this.meetings().filter((m) => m.date === iso);
  });

  goToPreviousMonth() {
    this.firstDayOfActiveMonth.set(this.firstDayOfActiveMonth().minus({ month: 1 }));
  }

  goToNextMonth() {
    this.firstDayOfActiveMonth.set(this.firstDayOfActiveMonth().plus({ month: 1 }));
  }

  goToToday() {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
    this.activeDay.set(this.today());
  }

  showMeetingForm() {
    this._router.navigate(['../meeting-create'], { relativeTo: this._route });
  }

  deleteEvent(event: Meetings) {
    if (event && event.id) {
      this.calendarService.deleteEvent(event.id).catch((error) => {
        console.error('Failed to delete event from UI after Firebase operation: ', error);
      });
    } else {
      console.warn(`Cannot delete event: the provided event or it's ID is missing.`);
    }
  }

  editEvent(event: Meetings) {
    this._router.navigate(['../meeting-edit'], {
      relativeTo: this._route,
      state: { event: event },
    });
  }
  directToLogin() {
    this._router.navigate(['/login'], { relativeTo: this._route });
  }
}
