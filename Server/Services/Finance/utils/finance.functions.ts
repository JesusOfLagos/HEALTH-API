import axios, { AxiosRequestConfig } from 'axios'; // Import Axios and AxiosRequestConfig
import User from '../../../Models/User/user.model';


export async function sendMoneyViaMaplerad(accountNumber: string, bankCode: string, reason: string, amount: number) {
    try {
        // const {accountNumber, bankCode, reason, amount} : any = req.body
        const options = {
            method: 'POST',
            url: process.env.BASE_URL + 'v1/transfers',
            headers: {
              'accept': 'application/json',
              'content-type': 'application/json',
              'Authorization': process.env.PAYMENT_SECRET_KEY,
            },
            data: {
              account_number: accountNumber,
              currency: 'NGN',
              bank_code: bankCode,
              reason: reason,
              amount: amount,
            },
          };
      
          const response = await axios.request(options);
          const data = {
            accountNumber: response.data.data.counterparty.account_number,
            bankName: response.data.data.counterparty.bank_name,
            accountName: response.data.data.counterparty.account_name,
            summary: response.data.data.summary,
            id: response.data.data.id
          }

          const errorData = {
            message: response.data.message,
            errorCode: response.status
          }
      
          // Check if the response status code indicates success (2xx)
          if (response.status >= 200 && response.status < 300) {
            return data
          } else {
            return false
          }
    } catch (error) {
        return false
    }
}
