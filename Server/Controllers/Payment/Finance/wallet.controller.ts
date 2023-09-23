
const Wallet = require("../../../Models/Payment/Finance/wallet.model")


async function CreateWallet (userId) {
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

module.exports = CreateWallet
