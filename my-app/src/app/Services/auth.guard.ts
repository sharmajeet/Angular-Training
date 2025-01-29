import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const toast = inject(ToastrService)
  const router = inject(Router);
  const loggedUser = localStorage.getItem('loginUser');

  if(loggedUser != null)
  {
    return true;
  }else
  {
    toast.warning("Route is Protected.")
    toast.info("Login first to navigate.")
    router.navigateByUrl('login');
    return false;
  }
};
