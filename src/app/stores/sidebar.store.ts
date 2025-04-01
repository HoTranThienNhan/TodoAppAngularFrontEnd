import { getState, patchState, signalStore, withMethods, withState } from "@ngrx/signals";

type SidebarState = {
    isCollapsed: boolean
};

const initialState: SidebarState = {
    isCollapsed: false
};

export const SidebarStateStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        getSidebarState(): boolean {
            const state: SidebarState = JSON.parse(sessionStorage.getItem("sidebarState")!);
            if (state) {
                return state.isCollapsed;
            }
            return initialState.isCollapsed;
        },
        storeSidebarState(isOpened: boolean): void {
            patchState(store, (state) => ({
                ...state,
                isCollapsed: isOpened,
            }));
            sessionStorage.setItem("sidebarState", JSON.stringify(getState(store)));
        },
        removeSidebarState(): void {
            patchState(store, (state) => ({
                ...state,
                isCollapsed: initialState.isCollapsed,
            }));
            sessionStorage.removeItem("sidebarState");
        }
    })),
);