export interface IAccountOperation {
    _id: string;
    accountNumber: string;
    type: 'withdraw' | 'deposit' | 'loan';
    amount: number;
    interest?: number;
    payments?: number;
    date: string;
}
