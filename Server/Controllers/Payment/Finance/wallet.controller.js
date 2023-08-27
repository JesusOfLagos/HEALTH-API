import Wallet from "../../../Models/Payment/Finance/wallet.model"

export default async function CreateWallet (userId) {
    try {
        const newWallet = new Wallet({
            user: userId
        })
        await newWallet.save()
        return newWallet._id
    } catch (error) {
        return;
    }
}


export default async function FundWallet (walletId) {
    try {
        
    } catch (error) {
        
    }                                                                                                                                                                                                                     
}