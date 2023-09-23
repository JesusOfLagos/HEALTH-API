import { sendMailToUser } from "../../../../Services/Mail/mailing.services"


export async function sendCreateSavingsMail (email: string) {
    try {
        const title = 'Savings Created'
        const content = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Savings Created</h1>
                <p style="text-align: center; color: #000;">Your savings has been created successfully</p>
            </div>
        </div>
        `
        await sendMailToUser(email, title, content)
        return true
    } catch (error) {
        return false
    }
}


export async function sendUpdateSavingsMail (email: string) {
    try {
        const title = 'Savings Updated'
        const updatesavingshtml = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Savings Updated</h1>
                <p style="text-align: center; color: #000;">Your savings has been updated successfully</p>
            </div>
        </div>
        `
        await sendMailToUser(email, title, updatesavingshtml)
        return true
    } catch (error) {
        return false
    }
}

export async function sendDeleteSavingsMail (email: string) {
    try {
        const title = 'Savings Deleted'
        const content = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Savings Deleted</h1>
                <p style="text-align: center; color: #000;">Your savings has been deleted successfully</p>
            </div>
        </div>
        `
        await sendMailToUser(email, title, content)
        return true
    } catch (error) {
        return false
    }
}

export async function sendDepositToSavingsMail (email: string, amount: number) {
    try {
        const title = 'Deposit To Savings'
        const content = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Deposit To Savings</h1>
                <p style="text-align: center; color: #000;">Your deposit of ${amount} has been made successfully at ${Date.now().toLocaleString}</p>
            </div>
        </div>
        `
        await sendMailToUser(email, title, content)
        return true
    } catch (error) {
        return false
    }
}

export async function sendWithdrawFromSavingsMail (email: string, amount: number) {
    try {
        const title = 'Withdraw From Savings'
        const content = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Withdraw From Savings</h1>
                <p style="text-align: center; color: #000;">Your withdrawal of ${amount} has been made successfully at ${Date.now().toLocaleString}</p>
            </div>
        </div>
        `
        await sendMailToUser(email, title, content)
        return true
    } catch (error) {
        return false
    }
}


export async function sendDeactivateSavingsMail (email: string) {
    try {
        const title = 'Savings Deactivated'
        const content = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Savings Deactivated</h1>
                <p style="text-align: center; color: #000;">Your savings has been deactivated successfully at ${Date.now().toLocaleString}</p>
            </div>
        </div>
        `
        await sendMailToUser(email, title, content)
        return true
    } catch (error) {
        return false
    }
}

export async function sendActivateSavingsMail (email: string) {
    try {
        const title = 'Savings Activated'
        const content = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Savings Activated</h1>
                <p style="text-align: center; color: #000;">Your savings has been activated successfully at ${Date.now().toLocaleString}</p>
            </div>
        </div>
        `
        await sendMailToUser(email, title, content)
        return true
    } catch (error) {
        return false
    }
}