import Card from "../models/card.models";


export const createCard = async (cardNumber: string, cardHolder: string, expirationDate: string, cvv: string, userId: string) => {
    try {
        const card = await Card.create({
            cardNumber,
            cardHolder,
            expirationDate,
            cvv,
            userId
        })
        await card.save()
        return card
    } catch (error) {
        return error
    }
}

export const getAllCards = async (userId: string) => {
    try {
        const cards = await Card.find({ userId })
        return cards
    } catch (error) {
        return error
    }
}

export const getCardById = async (cardId: string) => {
    try {
        const card = await Card.findById(cardId)
        return card
    } catch (error) {
        return error
    }
}


export const updateCardById = async (cardId: string, cardNumber: string, cardHolder: string, expirationDate: string, cvv: string) => {
    try {
        const card = await Card.findById(cardId)
        if (!card) return false
        card.cardNumber = cardNumber
        card.cardHolder = cardHolder
        card.expirationDate = expirationDate
        card.cvv = cvv
        await card.save()
        return card
    } catch (error) {
        return error
    }
}


export const deleteCardById = async (cardId: string) => {
    try {
        const card = await Card.findByIdAndDelete(cardId)
        return card
    } catch (error) {
        return error
    }
}

// export async function fundCard (req: any, res: any) {
//     try {
//         const { cardId, amount } = req.body
//         const card = await Card.findById(cardId)
//         if (!card) return res.status(404).json({ message: 'Card not found' })
//         card.balance += amount
//         await card.save()
//         return res.status(200).json({ message: 'Card funded successfully', card })
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// }