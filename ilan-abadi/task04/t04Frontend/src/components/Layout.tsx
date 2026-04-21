import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="container py-4">
            <header className="text-center mb-5">
                <h1 className="display-4 fw-bold text-primary">Welcome to BankAlek</h1>
                <hr />
            </header>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;
