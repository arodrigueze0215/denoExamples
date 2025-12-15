import type { ITransactionProcessor, Transaction, TransactionResponse } from "./ITransactionProcessor.ts";

export class CurrencyConversionDecorator implements ITransactionProcessor {
    private readonly wrapper: ITransactionProcessor;
    
    constructor(wrapper: ITransactionProcessor) {
        this.wrapper = wrapper;
    }
    
    process(transaction: Transaction): TransactionResponse {
        console.log(`Starting currency conversion for transaction ${transaction.id}`);
        const response = this.wrapper.process(transaction);
        if (transaction.currency !== 'USD') {
            response.message = `${response.message} (converted to ${transaction.currency})`;
        }
        console.log(`Finishing currency conversion for transaction ${transaction.id}: ${response.status} - ${response.message}`);
        return response;
    }
}