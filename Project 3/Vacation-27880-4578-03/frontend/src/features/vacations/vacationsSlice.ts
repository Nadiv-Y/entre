import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type VacationModel from "../../Models/VacationModel";

export interface VacationState {
    vacations: VacationModel[];
}

const initialState: VacationState = {
    vacations: []
};

const vacationSlice = createSlice({
    name: "vacations",
    initialState,
    reducers: {
        setVacations: (state, action: PayloadAction<VacationModel[]>) => {
            state.vacations = action.payload;
        },
        vacationAdded: (state, action: PayloadAction<VacationModel>) => {
            state.vacations.push(action.payload);
        },
        vacationUpdated: (state, action: PayloadAction<VacationModel>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.id);
            if (index >= 0) {
                // Preserve follow status/count if payload doesn't have it (optional, but payload from backend update usually has full object).
                // Backend 'updateVacation' returns full object but follow info? 
                // Logic: backend update returns Vacation object. Does it calculate followersCount?
                // Backend 'updateVacation' returns the object it constructed from body. It does NOT re-query followers count.
                // So if we blindly replace, we lose followersCount.
                // We must merge or ensure payload has it. 
                // Better to merge:
                const existing = state.vacations[index];
                state.vacations[index] = { ...existing, ...action.payload };
            }
        },
        vacationDeleted: (state, action: PayloadAction<number>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload);
            if (index >= 0) {
                state.vacations.splice(index, 1);
            }
        },
        followOptimistic: (state, action: PayloadAction<number>) => {
            const vacation = state.vacations.find(v => v.id === action.payload);
            if (vacation) {
                vacation.isFollowing = 1;
                vacation.followersCount = (vacation.followersCount || 0) + 1;
            }
        },
        unfollowOptimistic: (state, action: PayloadAction<number>) => {
            const vacation = state.vacations.find(v => v.id === action.payload);
            if (vacation) {
                vacation.isFollowing = 0;
                vacation.followersCount = (vacation.followersCount || 0) - 1;
            }
        },
        clearVacations: (state) => {
            state.vacations = [];
        }
    }
});

export const { setVacations, vacationAdded, vacationUpdated, vacationDeleted, followOptimistic, unfollowOptimistic, clearVacations } = vacationSlice.actions;
export const vacationReducer = vacationSlice.reducer;
