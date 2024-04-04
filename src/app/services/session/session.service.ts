import { ApplicationRef, Injectable } from '@angular/core';
import type { GoogleAuthSession } from '../../models/session.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private googleOAuthSession$ = new BehaviorSubject<GoogleAuthSession>(
    {} as GoogleAuthSession
  );

  constructor(private ref: ApplicationRef) {
    this.checkSession(sessionStorage.getItem('gSession'));
  }

  public getSession(): Observable<GoogleAuthSession> {
    return this.googleOAuthSession$.asObservable();
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
