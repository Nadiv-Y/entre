import React from 'react';
import { Header } from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <main className="main-content">
                {children}
            </main>
            <footer className="app-footer">
                <p>&copy; {new Date().getFullYear()} Vacation Tagging System</p>
            </footer>
        </div>
    );
};
