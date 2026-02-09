import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ReportModel {
    vacationId: number;
    destination: string;
    followersCount: number;
}

export interface ReportsState {
    reports: ReportModel[];
}

const initialState: ReportsState = {
    reports: []
};

const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        setReports: (state, action: PayloadAction<ReportModel[]>) => {
            state.reports = action.payload;
        },
        clearReports: (state) => {
            state.reports = [];
        }
    }
});

export const { setReports, clearReports } = reportsSlice.actions;
export const reportsReducer = reportsSlice.reducer;
