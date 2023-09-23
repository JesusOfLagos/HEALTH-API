interface IInAppTransactionsError {
    message: string
}



class InAppTransactionsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InAppTransactionsError';
    }
}

module.exports = InAppTransactionsError;

//usage


// throw new InAppTransactionsError('Error while processing in-app transactions');