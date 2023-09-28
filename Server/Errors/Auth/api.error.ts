
interface IApiError {
    message: string
}

class ApiError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ApiError';
    }
}

interface IForbiddenError extends Error {
    message: string
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ForbiddenError';
    }
}