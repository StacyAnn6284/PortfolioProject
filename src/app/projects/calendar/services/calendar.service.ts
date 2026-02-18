import { Injectable } from '@angular/core';
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
import { authState, Auth, User } from '@angular/fire/auth';
import { Meetings } from '../meetings/meetings.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(
    private db: Database,
    private auth: Auth,
  ) {}

  private async getUserUid(): Promise<string> {
    const user = await firstValueFrom(
      authState(this.auth).pipe(
        filter((u): u is User => u !== null), // Filter out null (unauthenticated) states
        map((u) => u.uid), // Map to get only the UID
      ),
    );
    return user;
  }

  async getAllEvents(): Promise<Observable<Meetings[]>> {
    const uid = await this.getUserUid();
    const eventsRef = ref(this.db, `users/${uid}/events`);
    return new Observable((observer) => {
      const unsubscribe = onValue(
        eventsRef,
        (snapshot: DataSnapshot) => {
          const data = snapshot.val();
          const events: Meetings[] = [];
          if (data) {
            Object.keys(data).forEach((key) => {
              events.push({ ...data[key], id: key });
            });
          }
          observer.next(events);
        },
        (error) => {
          observer.error(error);
        },
      );
      return () => unsubscribe();
    });
  }

  async addEvent(event: Meetings) {
    const uid = await this.getUserUid();
    const eventsRef = ref(this.db, `users/${uid}/events`);
    return push(eventsRef, { ...event, completed: false });
  }

  async updateEvent(id: string, updates: Partial<Meetings>) {
    const uid = await this.getUserUid();
    const eventsRef = ref(this.db, `users/${uid}/events/${id}`);
    return update(eventsRef, updates);
  }

  async deleteEvent(id: string) {
    const uid = await this.getUserUid();
    const eventsRef = ref(this.db, `users/${uid}/events/${id}`);
    return remove(eventsRef);
  }

  async getEventById(id: string): Promise<Observable<Meetings | null>> {
    const uid = await this.getUserUid();
    const eventsRef = ref(this.db, `users/${uid}/events/${id}`);
    return new Observable((observer) => {
      get(eventsRef)
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
