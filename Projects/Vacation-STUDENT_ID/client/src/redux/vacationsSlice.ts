import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Vacation {
  id: number;
  destination: string;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
  image_filename: string;
  follower_count: number;
  isFollowed: boolean;
}

interface VacationsState {
  items: Vacation[];
}

const initialState: VacationsState = { items: [] };

const vacationsSlice = createSlice({
  name: "vacations",
  initialState,
  reducers: {
    setVacations(state, action: PayloadAction<Vacation[]>) {
      state.items = action.payload;
    },

    // Optimistic follow/unfollow — UI re-sorts immediately
    toggleFollow(
      state,
      action: PayloadAction<{ vacationId: number; followed: boolean }>
    ) {
      const v = state.items.find(v => v.id === action.payload.vacationId);
      if (v) {
        v.isFollowed = action.payload.followed;
        v.follower_count += action.payload.followed ? 1 : -1;
      }
    },

    // Called by Socket.io when admin edits a vacation
    updateVacation(state, action: PayloadAction<Vacation>) {
      const idx = state.items.findIndex(v => v.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = {
          ...state.items[idx],       // keep isFollowed flag from client state
          ...action.payload,
        };
      }
    },

    addVacation(state, action: PayloadAction<Vacation>) {
      state.items.push(action.payload);
    },

    removeVacation(state, action: PayloadAction<number>) {
      state.items = state.items.filter(v => v.id !== action.payload);
    },
  },
});

// Selector: followed first, then by start_date (used in Vacations.tsx)
export const selectSortedVacations = (state: RootState): Vacation[] =>
  [...state.vacations.items].sort((a, b) => {
    if (a.isFollowed !== b.isFollowed) return a.isFollowed ? -1 : 1;
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
  });

export const { setVacations, toggleFollow, updateVacation, addVacation, removeVacation } =
  vacationsSlice.actions;

export default vacationsSlice.reducer;
