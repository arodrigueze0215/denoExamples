export enum TransactionStatus {
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    FLAGGED_FOR_REVIEW = 'FLAGGED_FOR_REVIEW'
}
export type Transaction = {
    id: string;
    amount: number;
    currency: string;
    from: string;
    to: string;
}

export type TransactionResponse = {
    status: TransactionStatus;
    id: string;
    message: string;
}

export interface ITransactionProcessor {
    process(transaction: Transaction): TransactionResponse;
}