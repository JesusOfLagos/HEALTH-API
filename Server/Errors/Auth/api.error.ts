interface IApiError {
    message: string
}

class ApiError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ApiError';
    }
}