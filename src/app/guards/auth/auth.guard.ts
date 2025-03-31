import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../../stores/user.store';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const userStore = inject(UserStore);
  const fallbackRoute: string = route.data['fallbackRoute'] ?? '/signin';

  if (userStore.getUser().id !== "") {
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
