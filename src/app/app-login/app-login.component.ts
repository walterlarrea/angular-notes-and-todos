import { jwtDecode } from 'jwt-decode';
import { Component, OnInit, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { SessionService } from '../services/session/session.service';
import { GoogleAuthSession } from '../models/session.model';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app-login.component.html',
  styleUrl: './app-login.component.scss',
})
export class AppLoginComponent implements OnInit {
  private client: any;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private ngZone: NgZone
  ) {}

  storeGoogleSession(session: GoogleAuthSession) {
    this.sessionService.storeSession(session);
  }

  googleSignIn = (token: CredentialResponse) => {
    console.log('signin', token);
    try {
      const decodedSession = jwtDecode<any>(token.credential);

      this.storeGoogleSession({
        name: decodedSession.name,
        email: decodedSession.email,
        exp: decodedSession.exp,
        pictureUrl: decodedSession.picture,
        id: decodedSession.sub,
      });
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      return true; // jwtDecode(token.credential);
    } catch (Error) {
      console.log('Login error = ', Error);
      return null;
    }
  };

  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      console.log("Google's One-tap sign in script loaded!");

      // @ts-ignore
      this.client = google.accounts.id.initialize({
        // Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
        client_id:
          '320589471933-agpn8nf7qtauj6gaij1jm6omfruf7o95.apps.googleusercontent.com',
        callback: this.googleSignIn, // .bind(this), // Whatever function you want to trigger...
        // auto_select: true,
        cancel_on_tap_outside: false,
      });

      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {
        console.log('Google prompt event triggered...');

        if (notification.getDismissedReason() === 'credential_returned') {
          this.ngZone.run(() => {
            this.router.navigate(['dashboard'], { replaceUrl: true });
            console.log('Welcome back!');
          });
        }
      });
    };
  }
}
