import type { ITransactionProcessor, Transaction, TransactionResponse } from "./ITransactionProcessor.ts";
import { TransactionStatus } from "./ITransactionProcessor.ts";

export class BasicPaymentProcessor implements ITransactionProcessor {
    process(transaction: Transaction): TransactionResponse {
        return {
            status: transaction.amount > 0 ? TransactionStatus.SUCCESS : TransactionStatus.FAILED,
            id: transaction.id,
            message: transaction.amount > 0 ? 'Payment processed successfully' : 'Insufficient funds'
        };
    }
}