interface IMongooseError {
    message: string
}

export class MongooseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Mongoose Error';
    }
}