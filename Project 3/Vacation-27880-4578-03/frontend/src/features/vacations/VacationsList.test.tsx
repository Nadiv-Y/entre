/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, waitFor, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { VacationsList } from './VacationsList';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import vacationsService from "../../Services/VacationsService";
import { setVacations } from "./vacationsSlice";
import { act } from '@testing-library/react';

// Mocks
vi.mock('../../Services/VacationsService', () => ({
    default: {
        getAllVacations: vi.fn(),
        follow: vi.fn(),
        unfollow: vi.fn(),
        deleteVacation: vi.fn()
    }
}));

vi.mock('../../Services/socket', () => ({
    socketService: {
        connect: vi.fn(),
        disconnect: vi.fn()
    }
}));

const mockVacations = [
    { id: 2, destination: "Tokyo", description: "Desc", fromDate: "2025-01-01", toDate: "2025-01-07", price: 2000, imageName: "tokyo.jpg", followersCount: 5, isFollowing: 1 },
    { id: 1, destination: "Paris", description: "Desc", fromDate: "2025-06-01", toDate: "2025-06-07", price: 1000, imageName: "paris.jpg", followersCount: 10, isFollowing: 0 },
    { id: 3, destination: "NYC", description: "Desc", fromDate: "2025-12-01", toDate: "2025-12-07", price: 1500, imageName: "nyc.jpg", followersCount: 0, isFollowing: 0 },
];

describe('VacationsList Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (vacationsService.getAllVacations as any).mockResolvedValue(mockVacations);
    });

    it('renders vacations and sorts by followed then date', async () => {
        const initialState = {
            auth: { user: { role: 'user', token: 'token' } as any, token: "token" }
        };

        const { store } = renderWithProviders(<VacationsList />, { preloadedState: initialState as any });

        act(() => {
            store.dispatch(setVacations(mockVacations));
        });

        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        });

        const tokyo = await screen.findByText("Tokyo");
        const paris = await screen.findByText("Paris");
        const nyc = await screen.findByText("NYC");

        expect(tokyo.compareDocumentPosition(paris)).toBe(4);
        expect(paris.compareDocumentPosition(nyc)).toBe(4);
    });

    it('follow button calls service', async () => {
        const initialState = {
            vacations: { vacations: mockVacations },
            auth: { user: { role: 'user', token: 'token' } }
        };

        renderWithProviders(<VacationsList />, { preloadedState: initialState as any });
        await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

        const parisCard = screen.getByText("Paris").closest('.MuiCard-root');
        const followBtn = parisCard?.querySelector('button');

        if (followBtn) fireEvent.click(followBtn);

        await waitFor(() => {
            expect(vacationsService.follow).toHaveBeenCalledWith(1);
        });
    });

    it('admin buttons hidden for non-admin', async () => {
        const initialState = {
            vacations: { vacations: mockVacations },
            auth: { user: { role: 'user', token: 'token' } }
        };
        renderWithProviders(<VacationsList />, { preloadedState: initialState as any });
        await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

        expect(screen.queryByText(/Add Vacation/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Edit/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Delete/i)).not.toBeInTheDocument();
    });

    it('admin buttons visible for admin', async () => {
        const initialState = {
            vacations: { vacations: mockVacations },
            auth: { user: { role: 'admin', token: 'token' } }
        };
        renderWithProviders(<VacationsList />, { preloadedState: initialState as any });
        await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

        expect(screen.getByText(/Add Vacation/i)).toBeInTheDocument();
        // Use getByText for "Edit" since it's present in the DOM
        expect(screen.getAllByText(/Edit/i).length).toBeGreaterThan(0);
    });
});
