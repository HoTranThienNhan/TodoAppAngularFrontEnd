import { effect, inject } from '@angular/core';
import { getState, patchState, signalStore, watchState, withHooks, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '../services/auth/auth.service';

type UserState = {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    phone: string,
    isActive: boolean
};

const initialState: UserState = {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    isActive: true
};

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, authService = inject(AuthService)) => ({
        // getUser from sessionStorage
        getUser(): UserState {
            const user: UserState = JSON.parse(sessionStorage.getItem("user")!);
            if (user) {
                authService.getProfile(user.email).subscribe({
                    next: (res) => {
                        this.storeUser(res.data);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
                return user;
            }
            return initialState;
        },

        // storeUser to sessionStorage
        storeUser(user: any): void {
            this.updateUser(user);
            sessionStorage.setItem("user", JSON.stringify(getState(store)))
        },

        // update User
        updateUser(user: any): void {
            patchState(store, (state) => ({
                ...state,
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                phone: user.phone,
                isActive: user.isActive,
            }));
        },

        // removeUser from sessionStorage
        removeUser(): void {
            this.updateUser(initialState);
            sessionStorage.removeItem("user");
        }

    })),
    withHooks({
        onInit(store) {
            effect(() => {
                const userState = getState(store);
            });
        }
    }),
);