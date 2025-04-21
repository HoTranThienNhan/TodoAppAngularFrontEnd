import { Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

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
    {
        path: 'verify-email',
        loadComponent: () => import('./pages/auth/verify-email/verify-email.component').then(c => c.VerifyEmailComponent)
    },
    {
        path: 'today',
        loadComponent: () => import('./pages/todo-task/today/today.component').then(c => c.TodayComponent),
        canActivate: [authGuard],
        data: {
            fallbackRoute: '/signin'
        }
    },
    {
        path: 'search',
        loadComponent: () => import('./pages/todo-task/search/search.component').then(c => c.SearchComponent),
        canActivate: [authGuard],
        data: {
            fallbackRoute: '/signin'
        }
    },
];
