import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import type { IAccountOperation } from '../types';

const AccountPage: React.FC = () => {
    const { accountNumber } = useParams<{ accountNumber: string }>();
    const [operations, setOperations] = useState<IAccountOperation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get(`/operations/${accountNumber}`);
                setOperations(response.data);
                setError('');
            } catch (err) {
                setError('Failed to load history');
            } finally {
                setLoading(false);
            }
        };

        if (accountNumber) fetchHistory();
    }, [accountNumber]);

    return (
        <div className="mt-4">
            <div className="text-center mb-5">
                <div className="d-flex justify-content-center gap-3 mb-4">
                    <Link to={`/new-operation?accountNumber=${accountNumber}`} className="btn btn-success shadow-sm">
                        To initiate a new operation on an account
                    </Link>
                    <Link to="/" className="btn btn-outline-danger shadow-sm">
                        Exit account
                    </Link>
                </div>
                <h2 className="display-6">Presenting operations History for account number: <span className="text-primary">{accountNumber}</span></h2>
            </div>

            {loading ? (
                <div className="text-center mt-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : operations.length === 0 ? (
                <div className="text-center mt-5">
                    <h3 className="text-danger fw-bold">No operations done on this account</h3>
                </div>
            ) : (
                <div className="row g-4">
                    {operations.map((op) => (
                        <div key={op._id} className="col-md-4">
                            <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
                                <div className="card-body">
                                    <h5 className="card-title text-capitalize fw-bold">{op.type}</h5>
                                    <hr />
                                    <p className="card-text mb-1"><strong>Amount:</strong> ${op.amount.toLocaleString()}</p>
                                    {op.type === 'loan' && (
                                        <>
                                            <p className="card-text mb-1"><strong>Interest:</strong> {op.interest}%</p>
                                            <p className="card-text mb-1"><strong>Payments:</strong> {op.payments}</p>
                                        </>
                                    )}
                                    <p className="card-text text-muted small mt-3">
                                        {new Date(op.date).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AccountPage;
