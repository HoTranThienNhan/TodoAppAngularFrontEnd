import { getState, patchState, signalStore, withMethods, withState } from "@ngrx/signals";

type SelectedItemType = "today" | "upcoming" | "done" | "important" | "calendar" | "search" | "settings";

type SelectedMenuTaskItemState = {
    selectedItem: SelectedItemType;
}

const initialState: SelectedMenuTaskItemState = {
    selectedItem: "today"
};

export const SelectedMenuTaskItemStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        getSelectedMenuTaskItemState(): SelectedItemType {
            const state: SelectedMenuTaskItemState = JSON.parse(sessionStorage.getItem("selectedMenuTaskItem")!);
            if (state) {
                return state.selectedItem;
            }
            return initialState.selectedItem;
        },
        storeSelectedMenuTaskItemState(selectedItem: SelectedItemType): void {
            patchState(store, (state) => ({
                ...state,
                selectedItem: selectedItem,
            }));
            sessionStorage.setItem("selectedMenuTaskItem", JSON.stringify(getState(store)));
        },
        removeSelectedMenuTaskItemState(): void {
            patchState(store, (state) => ({
                ...state,
                selectedItem: initialState.selectedItem,
            }));
            sessionStorage.removeItem("selectedMenuTaskItem");
        }
    })),
);
