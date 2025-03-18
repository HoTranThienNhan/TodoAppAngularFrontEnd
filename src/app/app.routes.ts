import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'signin',
        loadComponent: () => import('./pages/auth/signin/signin.component').then(c => c.SigninComponent)
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/auth/signup/signup.component').then(c => c.SignupComponent)
    },
];
