import Savings from "../../../../Models/Payment/Savings/savings.model"
import SavingsTransaction from "../../../../Models/Payment/Savings/savings.transaction.model"



export async function createFundraiserTransactionInstance (userId: string, type: string, savingsId: string, amount: number ) {
    try {
        const transaction = await SavingsTransaction.create({
            user: userId,
            savings: savingsId,
            amount,
            type: type
        })
        await transaction.save()
        return true
    } catch (error) {
        return false
    }
}