import type { ITransactionProcessor, Transaction, TransactionResponse } from "../src/ITransactionProcessor.ts";

export class AuditDecorator implements ITransactionProcessor {
    private readonly wrapper: ITransactionProcessor;


    constructor(wrapper: ITransactionProcessor) {
        this.wrapper = wrapper;
    }
    
    process(transaction: Transaction): TransactionResponse {
        console.log(`Starting audit for transaction ${transaction.id}`);
        const response = this.wrapper.process(transaction);
        console.log(`Finishing audit for transaction ${transaction.id}: ${response.status} - ${response.message}`);
        return response;
    }
}   