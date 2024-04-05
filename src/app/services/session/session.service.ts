import { Injectable } from '@angular/core';
import type { GoogleAuthSession } from '../../models/session.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private googleOAuthSession$ = new BehaviorSubject<GoogleAuthSession>(
    {} as GoogleAuthSession
  );

  constructor() {
    this.checkSession(sessionStorage.getItem('gSession'));
  }

  public getSessionObservable(): Observable<GoogleAuthSession> {
    return this.googleOAuthSession$.asObservable();
  }

  public getCurrentSession(): GoogleAuthSession {
    return this.googleOAuthSession$.value;
  }

  public storeSession(newSession: GoogleAuthSession): void {
    this.googleOAuthSession$.next(newSession);
    sessionStorage.setItem('gSession', JSON.stringify(newSession));
  }

  checkSession(gSession: string | null) {
    if (!gSession) return;

    this.googleOAuthSession$.next(JSON.parse(gSession));
  }
}
