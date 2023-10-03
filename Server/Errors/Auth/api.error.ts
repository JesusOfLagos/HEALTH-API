
interface IApiError {
    message: string
}

class ApiError extends Error {
    constructor(message) {
        super(message);
        this.name = 'API Error';
    }
}

interface IForbiddenError extends Error {
    message: string
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Forbidden Error';
    }
}

interface IUnauthorizedError extends Error {
    message: string
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message)
        this.name = "Unauthorized Error."
    }
}

