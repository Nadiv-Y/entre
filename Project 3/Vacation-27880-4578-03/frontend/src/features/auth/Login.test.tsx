import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { Login } from './Login';
import { describe, it, expect } from 'vitest';

describe('Login Component', () => {
    it('renders login form', () => {
        renderWithProviders(<Login />);
        // Get the heading specifically
        expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });
});
