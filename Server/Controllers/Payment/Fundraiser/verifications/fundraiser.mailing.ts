import { sendMailToUser } from "../../../../Services/Mail/mailing.services"


export async function sendCreateFundraiserMail (email: string) {
    try {
        const title = 'Fundraiser Created'
        const content = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Fundraiser Created</h1>
                <p style="text-align: center; color: #000;">Your Fundraiser has been created successfully</p>
            </div>
        </div>
        `
        await sendMailToUser(email, title, content)
        return true
    } catch (error) {
        return false
    }
}


export async function sendUpdateFundraiserMail (email: string) {
    try {
        const title = 'Fundraiser Updated'
        const updateFundraiserhtml = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Fundraiser Updated</h1>
                <p style="text-align: center; color: #000;">Your Fundraiser has been updated successfully</p>
            </div>
        </div>
        `
        await sendMailToUser(email, title, updateFundraiserhtml)
        return true
    } catch (error) {
        return false
    }
}

export async function sendDeleteFundraiserMail (email: string) {
    try {
        const title = 'Fundraiser Deleted'
        const content = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Fundraiser Deleted</h1>
                <p style="text-align: center; color: #000;">Your Fundraiser has been deleted successfully</p>
            </div>
        </div>
        `
        await sendMailToUser(email, title, content)
        return true
    } catch (error) {
        return false
    }
}

export async function sendDepositToFundraiserMail (email: string, amount: number) {
    try {
        const title = 'Deposit To Fundraiser'
        const content = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Deposit To Fundraiser</h1>
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

export async function sendWithdrawFromFundraiserMail (email: string, amount: number) {
    try {
        const title = 'Withdraw From Fundraiser'
        const content = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Withdraw From Fundraiser</h1>
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


export async function sendDeactivateFundraiserMail (email: string) {
    try {
        const title = 'Fundraiser Deactivated'
        const content = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Fundraiser Deactivated</h1>
                <p style="text-align: center; color: #000;">Your Fundraiser has been deactivated successfully at ${Date.now().toLocaleString}</p>
            </div>
        </div>
        `
        await sendMailToUser(email, title, content)
        return true
    } catch (error) {
        return false
    }
}

export async function sendActivateFundraiserMail (email: string) {
    try {
        const title = 'Fundraiser Activated'
        const content = `
        <div style="background-color: #f2f2f2; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="text-align: center; color: #000;">Fundraiser Activated</h1>
                <p style="text-align: center; color: #000;">Your Fundraiser has been activated successfully at ${Date.now().toLocaleString}</p>
            </div>
        </div>
        `
        await sendMailToUser(email, title, content)
        return true
    } catch (error) {
        return false
    }
}