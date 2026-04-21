import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../models/VacationModel";

interface VacationState {
    vacations: VacationModel[];
    lastUpdatedId: number | null;
}

const initialState: VacationState = {
    vacations: [],
    lastUpdatedId: null
};

const vacationSlice = createSlice({
    name: "vacations",
    initialState,
    reducers: {
        setVacations: (state, action: PayloadAction<VacationModel[]>) => {
            state.vacations = action.payload;
        },
        addVacation: (state, action: PayloadAction<VacationModel>) => {
            state.vacations.push(action.payload);
        },
        updateVacation: (state, action: PayloadAction<VacationModel>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.id);
            if (index !== -1) {
                state.vacations[index] = action.payload;
            }
        },
        deleteVacation: (state, action: PayloadAction<number>) => {
            state.vacations = state.vacations.filter(v => v.id !== action.payload);
        },
        toggleFollow: (state, action: PayloadAction<{ id: number; isFollowing: boolean }>) => {
            const vacation = state.vacations.find(v => v.id === action.payload.id);
            if (vacation) {
                vacation.isFollowing = action.payload.isFollowing;
                if (action.payload.isFollowing) {
                    vacation.followersCount!++;
                } else {
                    vacation.followersCount!--;
                }
            }
        },
        setLastUpdated: (state, action: PayloadAction<number | null>) => {
            state.lastUpdatedId = action.payload;
        }
    }
});

export const { setVacations, addVacation, updateVacation, deleteVacation, toggleFollow, setLastUpdated } = vacationSlice.actions;
export default vacationSlice.reducer;
