
import HealthCard from "../models/health.card.model";

export const createHealthCard = async (healthCard: any) => {
    const newHealthCard = new HealthCard(healthCard);
    return await newHealthCard.save();
}

export const getHealthCard = async (userId: string) => {
    const card = await HealthCard.findOne({ user: userId });
    return card;
}

export const updateHealthCard = async (userId: string, healthCard: any) => {
    const card = await HealthCard.findOneAndUpdate({ user: userId }, healthCard, { new: true });
    return card;
}

export const deleteHealthCard = async (userId: string) => {
    const card = await HealthCard.findOneAndDelete({ user: userId });
    return card;
}

export const blockHealthCard = async (userId: string) => {
    const card = await HealthCard.findOneAndUpdate({ user: userId }, { isBlocked: true }, { new: true });
    return card;
}

export const unblockHealthCard = async (userId: string) => {
    const card = await HealthCard.findOneAndUpdate({ user: userId }, { isBlocked: false }, { new: true });
    return card;
}

export const getAllHealthCards = async () => {
    const cards = await HealthCard.find();
    return cards;
}

export const getHealthCardById = async (cardId: string) => {
    const card = await HealthCard.findById(cardId);
    return card;
}

export const getHealthCardByCardNumber = async (cardNumber: string) => {
    const card = await HealthCard.find({ cardNumber });
    return card;
}


export async function generateTokenizedCardNumber (cardNumber: string) {
    const tokenizedCardNumber = cardNumber.slice(0, 4) + 'XXXXXXXX' + cardNumber.slice(12, 16)
    return tokenizedCardNumber
}


export async function generateTokenizedCardNumberForAllCards (cards: any[]) {
    const tokenizedCards = cards.map(card => {
        const tokenizedCardNumber = card.cardNumber.slice(0, 4) + 'XXXXXXXX' + card.cardNumber.slice(12, 16)
        return {
            ...card,
            cardNumber: tokenizedCardNumber
        }
    })
    return tokenizedCards
}

export async function unTokenizeCardNumber (tokenizedCardNumber: string) {
    const cardNumber = tokenizedCardNumber.slice(0, 4) + 'XXXXXXXX' + tokenizedCardNumber.slice(12, 16)
    return cardNumber
}

export async function generateCardNumber () {
    const cardNumber = Math.floor(Math.random() * 10000000000000000).toString()
    return cardNumber
}

export async function generateCVV () {
    const cvv = Math.floor(Math.random() * 1000).toString()
    return cvv
}

export async function generateExpiryDate () {
    const expiryDate = new Date()
    expiryDate.setFullYear(expiryDate.getFullYear() + 3)
    return expiryDate
}

export async function generateCardType () {
    const cardTypes = ['Verve', 'Visa', 'Mastercard']
    const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)]
    return cardType
}

