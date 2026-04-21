import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import api from '../services/api';

const NewOperationPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [accountNumber, setAccountNumber] = useState(searchParams.get('accountNumber') || '');
    const [type, setType] = useState<'withdraw' | 'deposit' | 'loan'>('deposit');
    const [amount, setAmount] = useState<number | ''>('');
    const [interest, setInterest] = useState<number | ''>('');
    const [payments, setPayments] = useState<number | ''>('');

    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', message: '', isSuccess: true });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = { accountNumber, type, amount, interest, payments };
            await api.post('/operations', data);

            setModalConfig({
                title: 'Success!',
                message: `${amount}$ was successfully ${type}ed to account number ${accountNumber}. Thank you for using BankAlek.`,
                isSuccess: true
            });
            setShowModal(true);
        } catch (err: any) {
            setModalConfig({
                title: 'Error',
                message: err.response?.data?.error || 'Failed to complete operation. Please try again.',
                isSuccess: false
            });
            setShowModal(true);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigate('/');
    };

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-7">
                <div className="card shadow-sm border-0">
                    <div className="card-header bg-success text-white py-3">
                        <h3 className="mb-0 text-center">New Operation</h3>
                    </div>
                    <div className="card-body p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Account Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">You may choose a new operation on your account</label>
                                <select
                                    className="form-select form-select-lg"
                                    value={type}
                                    onChange={(e) => setType(e.target.value as any)}
                                >
                                    <option value="deposit">Deposit</option>
                                    <option value="withdraw">Withdraw</option>
                                    <option value="loan">Loan</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">Amount ($)</label>
                                <input
                                    type="number"
                                    className="form-control form-control-lg"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    placeholder="Enter amount"
                                    required
                                    min="0"
                                />
                            </div>

                            {type === 'loan' && (
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <label className="form-label fw-bold">Interest (%)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={interest}
                                            onChange={(e) => setInterest(Number(e.target.value))}
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <label className="form-label fw-bold">Number of Payments</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={payments}
                                            onChange={(e) => setPayments(Number(e.target.value))}
                                            required
                                            min="1"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="d-grid mt-3">
                                <button type="submit" className="btn btn-success btn-lg shadow-sm">
                                    Save Operation
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Success/Error Modal */}
            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton className={modalConfig.isSuccess ? 'bg-success text-white' : 'bg-danger text-white'}>
                    <Modal.Title>{modalConfig.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4 text-center lead">
                    {modalConfig.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={modalConfig.isSuccess ? 'success' : 'danger'} onClick={handleModalClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NewOperationPage;
