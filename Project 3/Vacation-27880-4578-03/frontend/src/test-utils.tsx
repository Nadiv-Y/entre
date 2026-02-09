/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import { authReducer } from './features/auth/authSlice'
import { vacationReducer } from './features/vacations/vacationsSlice'
import { reportsReducer } from './features/reports/reportsSlice'
import type { RootState } from './app/store'

// Function to create a store instance for testing
function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: {
            auth: authReducer,
            vacations: vacationReducer,
            reports: reportsReducer
        } as any,
        preloadedState
    })
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>
    store?: ReturnType<typeof setupStore>
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren): React.JSX.Element {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </Provider>
        )
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
