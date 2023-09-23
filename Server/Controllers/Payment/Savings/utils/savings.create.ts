import Savings from "../../../../Models/Payment/Savings/savings.model"
import User from "../../../../Models/User/user.model"
import { sendActivateSavingsMail, sendCreateSavingsMail, sendDeactivateSavingsMail, sendDeleteSavingsMail, sendDepositToSavingsMail, sendUpdateSavingsMail, sendWithdrawFromSavingsMail } from "../verifications/savings.mailing"
import { createSavingsTransactionInstance } from "./savings.transactions"



export async function CreateSavings (req: any, res: any) {
    try {
        const userId = req.user
        const { name, description } = req.body
        const savings = await Savings.create({
            user: userId,
            name,
            description
        })
        await savings.save()
        sendCreateSavingsMail(savings.user.email)
        return res.status(200).json({ message: 'Savings created successfully', savings })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export async function GetAllSavingsForAUser (req: any, res: any) {
    try {
        const userId = req.user
        const savings = await Savings.find({ user: userId })
        return res.status(200).json({ message: 'Savings fetched successfully', savings })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export async function GetSavingsById (req: any, res: any) {
    try {
        const savingsId = req.params.savingId
        const savings = await Savings.findById(savingsId)
        return res.status(200).json({ message: 'Savings fetched successfully', savings })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function UpdateSavingsById (req: any, res: any) {
    try {
        const savingsId = req.params.savingId
        const { name, description } = req.body
        const savings = await Savings.findById(savingsId)
        if (!savings) return res.status(404).json({ message: 'Savings not found' })
        savings.name = name
        savings.description = description
        await savings.save()
        sendUpdateSavingsMail(savings.user.email)
        return res.status(200).json({ message: 'Savings updated successfully', savings })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function DeleteSavingsById (req: any, res: any) {
    try {
        const savingsId = req.params.savingId
        const savings = await Savings.findById(savingsId)
        if (!savings) return res.status(404).json({ message: 'Savings not found' })
        if (savings.balance > 0) return res.status(400).json({ message: 'Savings balance must be zero before deleting' })
        await savings.remove()
        sendDeleteSavingsMail(savings.user.email)
    } catch (error) {
        
    }
}

export async function DeactivateSavingsById (req: any, res: any) {
    try {
        const savingsId = req.params.savingId
        const savings = await Savings.findById(savingsId)
        if (!savings) return res.status(404).json({ message: 'Savings not found' })
        savings.status = 'inactive'
        await savings.save()
        sendDeactivateSavingsMail(savings.user.email)
        return res.status(200).json({ message: 'Savings deactivated successfully', savings })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export async function ActivateSavingsById (req: any, res: any) {
    try {
        const savingsId = req.params.savingId
        const savings = await Savings.findById(savingsId)
        if (!savings) return res.status(404).json({ message: 'Savings not found' })
        savings.status = 'active'
        await savings.save()
        await sendActivateSavingsMail(savings.user.email)
        return res.status(200).json({ message: 'Savings activated successfully', savings })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export async function DepositToSavings (req: any, res: any) {
    try {
        const { amount } = req.body
        if (amount <= 0) return res.status(400).json({ message: 'Amount must be greater than zero' })
        const userId = req.user
        const savingsId = req.params.savingId
        const user = await User.findById(userId).select('-password').populate('wallet').exec()
        const accountBalance = user?.wallet.balance
        if (!user) return res.status(404).json({ message: 'User not found' })
        if (accountBalance < amount) return res.status(400).json({ message: 'Insufficient funds' })
        const savings = await Savings.findById(savingsId)
        if (!savings) return res.status(404).json({ message: 'Savings not found' })
        user.wallet.balance -= amount
        savings.balance += amount
        await savings.save()
        await user.wallet.save()
        await createSavingsTransactionInstance(userId, 'Deposit', savingsId, amount)
        sendDepositToSavingsMail(savings.user.email, amount)
        return res.status(200).json({ message: 'Savings deposited successfully', savings })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function WithdrawFromSavings (req: any, res: any) {
    try {
        const { amount } = req.body
        if (amount <= 0) return res.status(400).json({ message: 'Amount must be greater than zero' })
        const userId = req.user
        const savingsId = req.params.savingId
        const savings = await Savings.findById(savingsId)
        const user = await User.findById(userId).select('-password').populate('wallet').exec()
        if (!user) return res.status(404).json({ message: 'User not found' })
        if (!savings) return res.status(404).json({ message: 'Savings not found' })
        if (savings.balance < amount) return res.status(400).json({ message: 'Insufficient funds' })
        savings.balance -= amount
        user.wallet.balance += amount
        await savings.save()
        await user.wallet.save()
        await createSavingsTransactionInstance(userId, 'Withdrawal', savingsId, amount)
        sendWithdrawFromSavingsMail(savings.user.email, amount)
        return res.status(200).json({ message: 'Savings withdrawn successfully', savings })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}