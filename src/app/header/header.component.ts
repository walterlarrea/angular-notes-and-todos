import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleAuthSession } from '../models/session.model';
import { SessionService } from '../services/session/session.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentSession$: Observable<GoogleAuthSession> =
    this.sessionService.getSession();

  constructor(private sessionService: SessionService) {}
}
