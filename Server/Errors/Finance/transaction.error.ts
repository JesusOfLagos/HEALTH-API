export interface ITransactionError extends Error {
    message: string
}

export class TransactionError extends Error {
    constructor(message) {
        super(message)
        this.message = "Transaction Error"
    }
}