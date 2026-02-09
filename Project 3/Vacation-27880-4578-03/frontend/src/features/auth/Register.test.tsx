import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import { Register } from './Register';
import { describe, it, expect } from 'vitest';

describe('Register Component', () => {
    it('renders register form', () => {
        renderWithProviders(<Register />);
        // Get the heading specifically to avoid multiple matches with the button text
        expect(screen.getByRole('heading', { name: /Sign Up/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });
});
