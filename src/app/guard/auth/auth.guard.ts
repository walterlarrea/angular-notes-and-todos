import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../../services/session/session.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sessionStorage = inject(SessionService);
  const router = inject(Router);

  if (sessionStorage.isAuthenticated()) {
    return true;
  } else {
    const urlTree = router.createUrlTree(['/login']);
    return urlTree;
  }
  return sessionStorage.isAuthenticated();
};
