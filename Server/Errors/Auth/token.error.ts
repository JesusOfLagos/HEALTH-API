interface ITokensError {
    message: string
}


export class AppTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TokenError';
    }
}


