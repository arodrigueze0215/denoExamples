import type { ITransactionProcessor, Transaction, TransactionResponse } from "./ITransactionProcessor.ts";
import { TransactionStatus } from "./ITransactionProcessor.ts";

export class FraudCheckDecorator implements ITransactionProcessor {
    private readonly wrapper: ITransactionProcessor;
    
    constructor(wrapper: ITransactionProcessor) {
        this.wrapper = wrapper;
    }
    
    process(transaction: Transaction): TransactionResponse {
        console.log(`Starting fraud check for transaction ${transaction.id}`);
        let response: TransactionResponse;
        if (transaction.amount > 1000) {
            response = {
                status: TransactionStatus.FLAGGED_FOR_REVIEW,
                id: transaction.id,
                message: 'Transaction flagged for review'
            };
        } else {
            response = this.wrapper.process(transaction);
        }
        console.log(`Finishing fraud check for transaction ${transaction.id}: ${response.status} - ${response.message}`);
        return response;
    }
}   