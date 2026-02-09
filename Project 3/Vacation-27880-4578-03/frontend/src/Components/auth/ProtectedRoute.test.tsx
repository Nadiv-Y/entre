/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { ProtectedRoute } from './ProtectedRoute';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../features/auth/authSlice';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual as any,
        useNavigate: () => mockNavigate
    };
});

describe('ProtectedRoute', () => {
    it('redirects to login if not authenticated', () => {
        const store = configureStore({
            reducer: { auth: authReducer },
            preloadedState: { auth: { token: "", user: null } }
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProtectedRoute><div>Protected Content</div></ProtectedRoute>
                </BrowserRouter>
            </Provider>
        );

        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('renders children if authenticated', () => {
        const store = configureStore({
            reducer: { auth: authReducer },
            preloadedState: { auth: { token: "fake-token", user: { role: 'user' } as any } }
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProtectedRoute><div>Protected Content</div></ProtectedRoute>
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
});
