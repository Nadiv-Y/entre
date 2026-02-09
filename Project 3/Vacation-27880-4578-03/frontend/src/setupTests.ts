/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Clean up after each test
afterEach(() => {
    cleanup();
});

// Mock ResizeObserver
(globalThis as any).ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
};

// Global mocks
vi.stubGlobal('scrollTo', vi.fn());
