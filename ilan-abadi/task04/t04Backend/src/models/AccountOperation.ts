import { model } from 'mongoose';
import AccountOperationSchema, { IAccountOperation } from '../schemas/AccountOperation';

const AccountOperation = model<IAccountOperation>('AccountOperation', AccountOperationSchema, 'AccountOperations');

export default AccountOperation;
