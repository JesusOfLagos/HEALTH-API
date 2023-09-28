
import User from "../../../../Models/User/user.model"
import { sendActivateFundraiserMail, sendCreateFundraiserMail, sendDeactivateFundraiserMail, sendDeleteFundraiserMail, sendDepositToFundraiserMail, sendUpdateFundraiserMail, sendWithdrawFromFundraiserMail } from "../verifications/fundraiser.mailing"
import { createFundraiserTransactionInstance } from "./fundraiser.transaction"
import Fundraiser from "../../../../Models/Payment/Fundraiser/fundraiser.model"


export async function CreateFundraiser (req: any, res: any) {
    try {
        const userId = req.user
        const { name, description } = req.body
        const fundraiser: any = await Fundraiser.create({
            user: userId,
            name,
            description
        })
        await fundraiser.save()
        sendCreateFundraiserMail(fundraiser.user.email)
        return res.status(200).json({ message: 'Fundraiser created successfully', fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export async function GetAllFundraiserForAUser (req: any, res: any) {
    try {
        const userId = req.user
        const fundraiser = await Fundraiser.find({ user: userId })
        return res.status(200).json({ message: 'Fundraiser fetched successfully', fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export async function GetFundraiserById (req: any, res: any) {
    try {
        const FundraiserId = req.params.savingId
        const fundraiser = await Fundraiser.findById(FundraiserId)
        return res.status(200).json({ message: 'Fundraiser fetched successfully', fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function UpdateFundraiserById (req: any, res: any) {
    try {
        const FundraiserId = req.params.savingId
        const { name, description } = req.body
        const fundraiser: any = await Fundraiser.findById(FundraiserId)
        if (!fundraiser) return res.status(404).json({ message: 'Fundraiser not found' })
        fundraiser.name = name
        fundraiser.description = description
        await fundraiser.save()
        sendUpdateFundraiserMail(fundraiser.user.email)
        return res.status(200).json({ message: 'Fundraiser updated successfully', fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function DeleteFundraiserById (req: any, res: any) {
    try {
        const FundraiserId = req.params.savingId
        const fundraiser: any = await Fundraiser.findById(FundraiserId)
        if (!fundraiser) return res.status(404).json({ message: 'Fundraiser not found' })
        if (fundraiser.balance > 0) return res.status(400).json({ message: 'Fundraiser balance must be zero before deleting' })
        await fundraiser.remove()
        sendDeleteFundraiserMail(fundraiser.user.email)
    } catch (error) {
        
    }
}

export async function DeactivateFundraiserById (req: any, res: any) {
    try {
        const FundraiserId = req.params.savingId
        const fundraiser: any = await Fundraiser.findById(FundraiserId)
        if (!fundraiser) return res.status(404).json({ message: 'Fundraiser not found' })
        fundraiser.status = 'inactive'
        await fundraiser.save()
        sendDeactivateFundraiserMail(fundraiser.user.email)
        return res.status(200).json({ message: 'Fundraiser deactivated successfully', fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export async function ActivateFundraiserById (req: any, res: any) {
    try {
        const FundraiserId = req.params.savingId
        const fundraiser: any = await Fundraiser.findById(FundraiserId)
        if (!fundraiser) return res.status(404).json({ message: 'Fundraiser not found' })
        fundraiser.status = 'active'
        await fundraiser.save()
        await sendActivateFundraiserMail(fundraiser.user.email)
        return res.status(200).json({ message: 'Fundraiser activated successfully', fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export async function DepositToFundraiser (req: any, res: any) {
    try {
        const { amount } = req.body
        if (amount <= 0) return res.status(400).json({ message: 'Amount must be greater than zero' })
        const userId = req.user
        const FundraiserId = req.params.savingId
        const user = await User.findById(userId).select('-password').populate('wallet').exec()
        const accountBalance = user?.wallet.balance
        if (!user) return res.status(404).json({ message: 'User not found' })
        if (accountBalance < amount) return res.status(400).json({ message: 'Insufficient funds' })
        const fundraiser: any = await Fundraiser.findById(FundraiserId)
        if (!fundraiser) return res.status(404).json({ message: 'Fundraiser not found' })
        user.wallet.balance -= amount
        fundraiser.balance += amount
        await fundraiser.save()
        await user.wallet.save()
        await createFundraiserTransactionInstance(userId, 'Deposit', FundraiserId, amount)
        sendDepositToFundraiserMail(fundraiser.user.email, amount)
        return res.status(200).json({ message: 'Fundraiser deposited successfully', fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function WithdrawFromFundraiser (req: any, res: any) {
    try {
        const { amount } = req.body
        if (amount <= 0) return res.status(400).json({ message: 'Amount must be greater than zero' })
        const userId = req.user
        const FundraiserId = req.params.savingId
        const fundraiser: any = await Fundraiser.findById(FundraiserId)
        const user = await User.findById(userId).select('-password').populate('wallet').exec()
        if (!user) return res.status(404).json({ message: 'User not found' })
        if (!fundraiser) return res.status(404).json({ message: 'Fundraiser not found' })
        if (fundraiser.balance < amount) return res.status(400).json({ message: 'Insufficient funds' })
        fundraiser.balance -= amount
        user.wallet.balance += amount
        await fundraiser.save()
        await user.wallet.save()
        await createFundraiserTransactionInstance(userId, 'Withdrawal', FundraiserId, amount)
        sendWithdrawFromFundraiserMail(fundraiser.user.email, amount)
        return res.status(200).json({ message: 'Fundraiser withdrawn successfully', fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}