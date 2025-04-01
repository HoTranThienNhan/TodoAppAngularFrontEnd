import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const fallbackRoute: string = route.data['fallbackRoute'] ?? '/signin';

  if (JSON.parse(sessionStorage.getItem("user")!).id !== "") {
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
