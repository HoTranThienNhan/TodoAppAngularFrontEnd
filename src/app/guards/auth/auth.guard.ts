import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStorageCheckHelper } from '../../helpers/session-storage-check/session-storage-check-helper.helper';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const fallbackRoute: string = route.data['fallbackRoute'] ?? '/signin';

  if (SessionStorageCheckHelper.isItemFound("user")) {
    return true;
  }

  // redirect after signing in
  router.navigate([fallbackRoute], { 
    queryParams: {
      returnUrl: state.url
    },
  });
  return false;
};
