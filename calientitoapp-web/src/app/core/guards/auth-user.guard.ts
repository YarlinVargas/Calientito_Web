import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.getAuthToken();
};
