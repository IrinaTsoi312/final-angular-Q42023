import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const currentPage = route.url[0].path;
  const router = inject(Router);
  const logedIn = localStorage.getItem("token");

  if (logedIn) {
    return true;
  } else {
    alert("Please, log into your account!");
    return false;
  }
};
