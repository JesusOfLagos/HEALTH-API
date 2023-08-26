import Wallet from "../../../Models/Payment/Finance/wallet.model"

export default async function CreateWallet (userId) {
    try {
        const newWallet = new Wallet({
            user: userId
        })
    } catch (error) {
        
    }
}