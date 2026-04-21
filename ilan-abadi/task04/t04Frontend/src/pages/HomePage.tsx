import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const navigate = useNavigate();

    const handleGoToAccount = (e: React.FormEvent) => {
        e.preventDefault();
        if (accountNumber.trim()) {
            navigate(`/account/${accountNumber}`);
        }
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-6">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <form onSubmit={handleGoToAccount}>
                            <div className="mb-3 text-center">
                                <label htmlFor="accountInput" className="form-label lead">
                                    Please enter your account number to see your operations history and to perform new operations
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg text-center"
                                    id="accountInput"
                                    placeholder="Enter Account Number"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-grid shadow-sm">
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Go to my account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
