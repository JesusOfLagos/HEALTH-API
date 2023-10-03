interface IInAppTransactionsError {
    message: string
}



export class InAppTransactionsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'In-App Transaction Error';
    }
}


