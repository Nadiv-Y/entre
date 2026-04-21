import { Schema } from 'mongoose';

export interface IAccountOperation {
    accountNumber: string;
    type: 'withdraw' | 'deposit' | 'loan';
    amount: number;
    interest?: number;
    payments?: number;
    date: Date;
}

const AccountOperationSchema = new Schema<IAccountOperation>({
    accountNumber: {
        type: String,
        required: [true, 'Account number is required']
    },
    type: {
        type: String,
        enum: ['withdraw', 'deposit', 'loan'],
        required: [true, 'Operation type is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    interest: {
        type: Number,
        required: function() { return (this as any).type === 'loan'; }
    },
    payments: {
        type: Number,
        required: function() { return (this as any).type === 'loan'; }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default AccountOperationSchema;
