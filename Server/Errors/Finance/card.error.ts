export interface ICardError extends Error {
    message: string
}

export class CardError extends Error {
    constructor(message) {
        super(message)
        this.message = "Card Error"
    }
}


