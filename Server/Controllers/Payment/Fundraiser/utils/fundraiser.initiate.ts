
import User from "../../../../Models/User/user.model"
import { sendActivateFundraiserMail, sendCreateFundraiserMail, sendDeactivateFundraiserMail, sendDeleteFundraiserMail, sendDepositToFundraiserMail, sendUpdateFundraiserMail, sendWithdrawFromFundraiserMail } from "../verifications/fundraiser.mailing"
import { createFundraiserTransactionInstance } from "./fundraiser.transaction"
import Fundraiser from "../../../../Models/Payment/Fundraiser/fundraiser.model"


export async function CreateFundraiser (req: any, res: any) {
    try {
        const userId = req.user
        const { name, description } = req.body
        const fundraiser = await Fundraiser.create({
            user: userId,
            name,
            description
        })
        await fundraiser.save()
        sendCreateFundraiserMail(fundraiser.user.email)
        return res.status(200).json({ message: 'Fundraiser created successfully', Fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export async function GetAllFundraiserForAUser (req: any, res: any) {
    try {
        const userId = req.user
        const Fundraiser = await Fundraiser.find({ user: userId })
        return res.status(200).json({ message: 'Fundraiser fetched successfully', Fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export async function GetFundraiserById (req: any, res: any) {
    try {
        const FundraiserId = req.params.savingId
        const Fundraiser = await Fundraiser.findById(FundraiserId)
        return res.status(200).json({ message: 'Fundraiser fetched successfully', Fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function UpdateFundraiserById (req: any, res: any) {
    try {
        const FundraiserId = req.params.savingId
        const { name, description } = req.body
        const Fundraiser = await Fundraiser.findById(FundraiserId)
        if (!Fundraiser) return res.status(404).json({ message: 'Fundraiser not found' })
        Fundraiser.name = name
        Fundraiser.description = description
        await Fundraiser.save()
        sendUpdateFundraiserMail(Fundraiser.user.email)
        return res.status(200).json({ message: 'Fundraiser updated successfully', Fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export async function DeleteFundraiserById (req: any, res: any) {
    try {
        const FundraiserId = req.params.savingId
        const Fundraiser = await Fundraiser.findById(FundraiserId)
        if (!Fundraiser) return res.status(404).json({ message: 'Fundraiser not found' })
        if (Fundraiser.balance > 0) return res.status(400).json({ message: 'Fundraiser balance must be zero before deleting' })
        await Fundraiser.remove()
        sendDeleteFundraiserMail(Fundraiser.user.email)
    } catch (error) {
        
    }
}

export async function DeactivateFundraiserById (req: any, res: any) {
    try {
        const FundraiserId = req.params.savingId
        const Fundraiser = await Fundraiser.findById(FundraiserId)
        if (!Fundraiser) return res.status(404).json({ message: 'Fundraiser not found' })
        Fundraiser.status = 'inactive'
        await Fundraiser.save()
        sendDeactivateFundraiserMail(Fundraiser.user.email)
        return res.status(200).json({ message: 'Fundraiser deactivated successfully', Fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export async function ActivateFundraiserById (req: any, res: any) {
    try {
        const FundraiserId = req.params.savingId
        const Fundraiser = await Fundraiser.findById(FundraiserId)
        if (!Fundraiser) return res.status(404).json({ message: 'Fundraiser not found' })
        Fundraiser.status = 'active'
        await Fundraiser.save()
        await sendActivateFundraiserMail(Fundraiser.user.email)
        return res.status(200).json({ message: 'Fundraiser activated successfully', Fundraiser })
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
        const Fundraiser = await Fundraiser.findById(FundraiserId)
        if (!Fundraiser) return res.status(404).json({ message: 'Fundraiser not found' })
        user.wallet.balance -= amount
        Fundraiser.balance += amount
        await Fundraiser.save()
        await user.wallet.save()
        await createFundraiserTransactionInstance(userId, 'Deposit', FundraiserId, amount)
        sendDepositToFundraiserMail(Fundraiser.user.email, amount)
        return res.status(200).json({ message: 'Fundraiser deposited successfully', Fundraiser })
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
        const Fundraiser = await Fundraiser.findById(FundraiserId)
        const user = await User.findById(userId).select('-password').populate('wallet').exec()
        if (!user) return res.status(404).json({ message: 'User not found' })
        if (!Fundraiser) return res.status(404).json({ message: 'Fundraiser not found' })
        if (Fundraiser.balance < amount) return res.status(400).json({ message: 'Insufficient funds' })
        Fundraiser.balance -= amount
        user.wallet.balance += amount
        await Fundraiser.save()
        await user.wallet.save()
        await createFundraiserTransactionInstance(userId, 'Withdrawal', FundraiserId, amount)
        sendWithdrawFromFundraiserMail(Fundraiser.user.email, amount)
        return res.status(200).json({ message: 'Fundraiser withdrawn successfully', Fundraiser })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}